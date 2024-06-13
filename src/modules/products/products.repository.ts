import { subDays, format } from 'date-fns';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import {
  PRODUCT_DATE_RANGE_FORMAT,
  PRODUCTS_LIMIT,
  PRODUCTS_OFFSET,
} from '../../common/constants/constants';
import { ProductEntity } from '../../entities/index';

import { GetProductsQueryDto } from './dto/get-products-query.dto';

@Injectable()
export class ProductsRepository extends Repository<ProductEntity> {
  constructor(dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  async findAll(query: GetProductsQueryDto): Promise<ProductEntity[]> {
    const qb = this.createQueryBuilder('product')
      .leftJoinAndSelect('product.image', 'image')
      .leftJoinAndSelect('product.size', 'size')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.color', 'color')
      .leftJoinAndSelect('product.style', 'style')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.material', 'material')
      .select([
        'product.id as id',
        'product.name as name',
        'product.min_price as minPrice',
        'product.max_price as maxPrice',
        'product.created_at as createdAt',
        'image.url as imageUrl',
        'size.name as sizeName',
        'category.name as categoryName',
        'color.name as colorName',
        'style.name as styleName',
        'brand.name as brandName',
        'material.name as materialName',
        'product.gender as gender',
      ]);

    const limit = query.limit || PRODUCTS_LIMIT;
    const offset = query.offset || PRODUCTS_OFFSET;

    qb.limit(limit).offset(offset);

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

    return qb.getRawMany();
  }
}
