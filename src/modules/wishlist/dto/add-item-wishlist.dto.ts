import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddItemWishlistDto {
  @ApiProperty({ description: 'The ID of the product to add to the wishlist' })
  @IsNotEmpty()
  productId: number;
}
