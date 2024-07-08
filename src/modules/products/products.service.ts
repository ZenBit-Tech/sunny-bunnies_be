import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductEntity } from '~/entities';
import { ProductsRepository } from './products.repository';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { PRODUCTS_LIMIT } from '~/common/constants/constants';

@Injectable()
export class ProductsService {
  private readonly productsRepository: ProductsRepository;

  constructor(productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository;
  }

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

  async findById(id: number): Promise<ProductEntity | null> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product was not found');
    }

    return product;
  }
}
