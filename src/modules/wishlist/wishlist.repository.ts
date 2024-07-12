import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Wishlist } from '~/entities';

@Injectable()
export class WishlistRepository extends Repository<Wishlist> {
  constructor(dataSource: DataSource) {
    super(Wishlist, dataSource.createEntityManager());
  }
}
