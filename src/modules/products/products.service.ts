import { Injectable } from '@nestjs/common';

import { ProductEntity } from '~/entities';
import { ProductsRepository } from './products.repository';
import { GetProductsQueryDto } from './dto/get-products-query.dto';

@Injectable()
export class ProductsService {
  private readonly productsRepository: ProductsRepository;

  constructor(productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async findAll(query: GetProductsQueryDto): Promise<ProductEntity[]> {
    return this.productsRepository.findAll(query);
  }

  async findById(id: number): Promise<ProductEntity> {
    return this.productsRepository.findById(id);
  }
}
