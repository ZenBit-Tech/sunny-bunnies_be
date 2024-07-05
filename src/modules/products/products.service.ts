import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductEntity } from '~/entities';
import { ProductsRepository } from './products.repository';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { ProductActivityStatus } from '~/common/enums';

@Injectable()
export class ProductsService {
  private readonly productsRepository: ProductsRepository;

  constructor(productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async findAll(query: GetProductsQueryDto): Promise<ProductEntity[]> {
    return this.productsRepository.findAll(query);
  }

  async findById(id: number): Promise<ProductEntity | null> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product was not found');
    }

    return product;
  }

  async findAndSortProducts(
    order: 'ASC' | 'DESC',
    searchQuery: string,
    page: number,
    limit: number,
    productActivityStatus: ProductActivityStatus,
  ): Promise<{
    products: ProductEntity[];
    totalCount: number;
    totalPages: number;
  }> {
    const { products, totalCount } =
      await this.productsRepository.findAndSortProducts(
        order,
        page,
        limit,
        productActivityStatus,
        searchQuery,
      );
    const totalPages = Math.ceil(totalCount / limit);
    return { products, totalCount, totalPages };
  }
}
