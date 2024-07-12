import {
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'wishlist' })
export class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.wishlist)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => ProductEntity)
  @JoinTable({
    name: 'wishlist_products',
    joinColumn: {
      name: 'wishlist_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: ProductEntity[];
}
