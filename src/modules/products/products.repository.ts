import { subDays, format } from 'date-fns';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import {
  PRODUCT_DATE_RANGE_FORMAT,
  PRODUCTS_LIMIT,
  PRODUCTS_OFFSET,
} from '~/common/constants/constants';
import { ProductEntity } from '~/entities';

import { GetProductsQueryDto } from './dto/get-products-query.dto';

@Injectable()
export class ProductsRepository extends Repository<ProductEntity> {
  constructor(dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<ProductEntity> {
    const product = await this.createQueryBuilder('product')
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

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async findAll(query: GetProductsQueryDto): Promise<ProductEntity[]> {
    const qb = this.createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.style', 'style')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.material', 'material')
      .leftJoinAndSelect('product.variants', 'variants');

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
}
