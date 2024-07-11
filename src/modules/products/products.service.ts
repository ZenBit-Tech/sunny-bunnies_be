import { Injectable, NotFoundException } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';
import { ProductEntity } from '~/entities';
import { ProductsRepository } from './products.repository';
import { UsersRepository } from '../users/users.repository';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { PRODUCTS_LIMIT } from '~/common/constants/constants';

@Injectable()
export class ProductsService {
  private readonly productsRepository: ProductsRepository;

  private readonly usersRepository: UsersRepository;

  private readonly mailerService: MailerService;

  constructor(
    productsRepository: ProductsRepository,
    usersRepository: UsersRepository,
    mailerService: MailerService,
  ) {
    this.productsRepository = productsRepository;
    this.usersRepository = usersRepository;
    this.mailerService = mailerService;
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

    const user = await this.usersRepository.findById(product.user.id);

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
}
