import { Injectable, NotFoundException } from '@nestjs/common';
import { In } from 'typeorm';
import { ProductEntity } from '~/entities';
import { UsersRepository } from '../users/users.repository';
import { ProductsRepository } from '../products/products.repository';
import { WishlistRepository } from './wishlist.repository';

@Injectable()
export class WishlistService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly productRepository: ProductsRepository,
    private readonly wishlistRepository: WishlistRepository,
  ) {}

  async addToWishlist(userId: string, productId: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const wishlist = await this.wishlistRepository.findOne({
      where: { user: { id: userId } },
      relations: ['products'],
    });

    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }

    const productInWishlist = wishlist.products.find(
      (products) => products.id === productId,
    );

    if (productInWishlist) {
      await this.wishlistRepository
        .createQueryBuilder()
        .relation('products')
        .of(wishlist)
        .remove(product);
    } else {
      await this.wishlistRepository
        .createQueryBuilder()
        .relation('products')
        .of(wishlist)
        .add(product);
    }
  }

  async getWishlistProducts(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{
    products: ProductEntity[];
    totalCount: number;
    totalPages: number;
  }> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { user: { id: userId } },
      relations: ['products'],
    });

    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }

    const totalCount = wishlist.products.length;
    const totalPages = Math.ceil(totalCount / limit);

    const paginatedProducts = await this.productRepository.find({
      where: { id: In(wishlist.products.map((product) => product.id)) },
      relations: [
        'images',
        'category',
        'style',
        'brand',
        'material',
        'variants',
        'variants.size',
        'variants.color',
        'user',
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      products: paginatedProducts,
      totalCount,
      totalPages,
    };
  }

  async getEntireWishlist(userId: string): Promise<ProductEntity[]> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { user: { id: userId } },
      relations: ['products'],
    });

    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }

    return wishlist.products;
  }
}
