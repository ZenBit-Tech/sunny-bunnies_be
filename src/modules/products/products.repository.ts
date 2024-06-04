import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { ProductEntity } from 'src/entities';
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
        'product.price_from as priceFrom',
        'product.price_to as priceTo',
        'image.url as imageUrl',
        'size.name as sizeName',
        'category.name as categoryName',
        'color.name as colorName',
        'style.name as styleName',
        'brand.name as brandName',
        'material.name as materialName',
      ]);

    if (query.category) {
      qb.andWhere('category.name = :categoryName', {
        categoryName: query.category,
      });
    }

    return qb.getRawMany();
  }
}
