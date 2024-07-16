import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BrandEntity,
  CategoryEntity,
  ColorEntity,
  ImageEntity,
  MaterialEntity,
  ProductEntity,
  ProductVariantEntity,
  SizeEntity,
  StyleEntity,
} from '~/entities';
import { ProductsRepository } from './products.repository';
import { UsersService } from '../users/users.service';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { PRODUCTS_LIMIT } from '~/common/constants/constants';
import { CreateProductDto } from '~/modules/products/dto/create-product.dto';
import { TypeEntity } from '~/entities/type.entity';
import { UploadService } from '~/modules/upload/upload.service';

@Injectable({ scope: Scope.REQUEST })
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(TypeEntity)
    private readonly typeRepository: Repository<TypeEntity>,
    @InjectRepository(StyleEntity)
    private readonly styleRepository: Repository<StyleEntity>,
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
    @InjectRepository(MaterialEntity)
    private readonly materialRepository: Repository<MaterialEntity>,
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,
    @InjectRepository(ProductVariantEntity)
    private readonly variantRepository: Repository<ProductVariantEntity>,
    @InjectRepository(SizeEntity)
    private readonly sizeRepository: Repository<SizeEntity>,
    private readonly mailerService: MailerService,
    private readonly uploadService: UploadService,
    private readonly usersService: UsersService, // Inject UsersService
  ) {}

  async findAll(query: GetProductsQueryDto): Promise<{
    products: ProductEntity[];
    totalCount: number;
    totalPages: number;
  }> {
    const { products, totalCount } =
      await this.productsRepository.findAll(query);
    const limit = query.limit || PRODUCTS_LIMIT;
    const totalPages = Math.ceil(totalCount / limit);

    return { products, totalCount, totalPages };
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product was not found');
    }

    return product;
  }

  async softDeleteProduct(productId: string): Promise<void> {
    const product = await this.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.deletedAt = new Date();
    await this.productsRepository.save(product);

    const user = await this.usersService.findById(product.user.id);

    if (user) {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Product Was Deleted',
        template: 'delete-product',
        context: {
          name: user.name,
          productName: product.name,
        },
      });
    }
  }

  async createProduct(
    createProductDto: CreateProductDto,
    userId: string,
  ): Promise<ProductEntity> {
    const {
      variants,
      images,
      category,
      style,
      brand,
      type,
      material,
      ...productData
    } = createProductDto;

    const [
      categoryEntity,
      styleEntity,
      brandEntity,
      materialEntity,
      typeEntity,
    ] = await Promise.all([
      this.categoryRepository.findOne({ where: { id: category } }),
      this.styleRepository.findOne({ where: { id: style } }),
      this.brandRepository.findOne({ where: { id: brand } }),
      this.materialRepository.findOne({ where: { id: material } }),
      this.typeRepository.findOne({ where: { id: type } }),
    ]);

    if (!categoryEntity || !styleEntity || !brandEntity || !materialEntity) {
      throw new NotFoundException('One or more related entities not found');
    }

    const product = this.productsRepository.create({
      ...productData,
      category: categoryEntity,
      type: typeEntity,
      style: styleEntity,
      brand: brandEntity,
      material: materialEntity,
      user: { id: userId },
    });

    await this.productsRepository.save(product);

    const variantPromises = variants.map(async (variantDto) => {
      const { size, color, quantity } = variantDto;
      const [sizeEntity, colorEntity] = await Promise.all([
        this.sizeRepository.findOne({ where: { id: size } }),
        this.colorRepository.findOne({ where: { id: color } }),
      ]);
      const variant = this.variantRepository.create({
        quantity,
        product,
        size: sizeEntity,
        color: colorEntity,
      });
      return this.variantRepository.save(variant);
    });

    const imagePromises = images.map(async (imageDto) => {
      if (!imageDto.src) {
        throw new Error(`Image source is missing for image ${imageDto.src}`);
      }

      const imageBuffer = Buffer.from(imageDto.src, 'base64');
      const imageUrl = await this.uploadService.upload(
        imageDto.src,
        imageBuffer,
      );
      const image = this.imageRepository.create({
        url: imageUrl,
        product,
        description: imageDto.description,
        isPrimary: imageDto.isPrimary ? imageDto.isPrimary : false,
      });
      return this.imageRepository.save(image);
    });

    await Promise.all([...variantPromises, ...imagePromises]);

    return product;
  }
}
