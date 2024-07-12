import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { WishlistRepository } from './wishlist.repository';

@Module({
  imports: [UsersModule, ProductsModule],
  providers: [WishlistService, WishlistRepository],
  controllers: [WishlistController],
})
export class WishlistModule {}
