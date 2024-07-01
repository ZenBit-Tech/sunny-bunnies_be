import { subDays, format } from 'date-fns';
import { DataSource, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto';
import { Gender, ProductActivityStatus, ProductStatus } from '~/common/enums';
import {
  BrandEntity,
  CategoryEntity,
  ColorEntity,
  ImageEntity,
  MaterialEntity,
  ProductVariantEntity,
  SizeEntity,
  StyleEntity,
  TypeEntity,
  User,
  ProductEntity,
} from '~/entities';
import {
  PRODUCT_DATE_RANGE_FORMAT,
  PRODUCTS_LIMIT,
  PRODUCTS_OFFSET,
} from '~/common/constants/constants';

import { GetProductsQueryDto } from './dto/get-products-query.dto';

@Injectable()
export class ProductsRepository extends Repository<ProductEntity> {
  constructor(
    dataSource: DataSource,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(ProductVariantEntity)
    private readonly variantRepository: Repository<ProductVariantEntity>,

    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  findById(id: number): Promise<ProductEntity> {
    return this.createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.style', 'style')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.material', 'material')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('product.user', 'user')
      .leftJoinAndSelect('variants.size', 'size')
      .leftJoinAndSelect('variants.color', 'color')
      .where('product.id = :id', { id })
      .getOne();
  }

  findAll(query: GetProductsQueryDto): Promise<ProductEntity[]> {
    const qb = this.createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.style', 'style')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.user', 'user')
      .leftJoinAndSelect('product.material', 'material')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('variants.color', 'color')
      .leftJoinAndSelect('variants.size', 'size');

    if (query.category) {
      qb.andWhere('category.name = :categoryName', {
        categoryName: query.category,
      });
    }

    if (query.dateRange) {
      const startDate = format(
        subDays(new Date(), query.dateRange),
        PRODUCT_DATE_RANGE_FORMAT,
      );
      qb.andWhere('product.created_at >= :startDate', { startDate });
    }

    if (query.name) {
      qb.andWhere('LOWER(product.name) LIKE LOWER(:name)', {
        name: `%${query.name}%`,
      });
    }

    if (query.minPrice) {
      qb.andWhere('product.min_price >= :minPrice', {
        minPrice: query.minPrice,
      });
    }

    if (query.maxPrice) {
      qb.andWhere('product.max_price <= :maxPrice', {
        maxPrice: query.maxPrice,
      });
    }

    if (query.gender) {
      qb.andWhere('product.gender = :gender', { gender: query.gender });
    }

    if (query.size) {
      qb.andWhere('size.name = :sizeName', { sizeName: query.size });
    }

    if (query.color) {
      qb.andWhere('color.name = :colorName', { colorName: query.color });
    }

    if (query.style) {
      qb.andWhere('style.name = :styleName', { styleName: query.style });
    }

    if (query.brand) {
      qb.andWhere('brand.name = :brandName', { brandName: query.brand });
    }

    if (query.material) {
      qb.andWhere('material.name = :materialName', {
        materialName: query.material,
      });
    }

    const limit = query.limit || PRODUCTS_LIMIT;
    const offset = query.offset || PRODUCTS_OFFSET;

    qb.take(limit).skip(offset);

    return qb.getMany();
  }

  async createProductWithVariantsAndImages(
    userId: string,
    productDto: CreateProductDto,
  ): Promise<ProductEntity> {
    try {
      const product = this.productRepository.create({
        name: productDto.name,
        description: productDto.description,
        maxPrice: productDto.maxPrice,
        minPrice: productDto.minPrice,
        status: ProductStatus.FOR_RENT,
        activityStatus: ProductActivityStatus.INACTIVE,
        gender: productDto.gender === 1 ? Gender.MALE : Gender.FEMALE,
        brand: { id: productDto.brand } as BrandEntity,
        category: { id: productDto.category } as CategoryEntity,
        type: { id: productDto.type } as TypeEntity,
        style: { id: productDto.style } as StyleEntity,
        material: { id: productDto.material } as MaterialEntity,
        user: { id: userId } as User,
      });

      const savedProduct = await this.productRepository.save(product);

      const variants = productDto.variants.map((variantDto) => {
        const variant = this.variantRepository.create({
          color: { id: variantDto.color } as ColorEntity,
          size: { id: variantDto.size } as SizeEntity,
          quantity: variantDto.quantity,
          product: savedProduct,
        });
        return variant;
      });

      await this.variantRepository.save(variants);

      const images = productDto.images.map((imageDto) => {
        const image = this.imageRepository.create({
          ...imageDto,
          product: savedProduct,
        });
        return image;
      });

      await this.imageRepository.save(images);

      return savedProduct;
    } catch (error) {
      throw new BadRequestException(
        `Failed to create product: ${error.message}`,
      );
    }
  }
}
