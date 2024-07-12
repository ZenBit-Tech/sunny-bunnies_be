import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { UsersRepository } from '../users/users.repository';
import { ProductsRepository } from '../products/products.repository';
import { WishlistRepository } from './wishlist.repository';
import { Wishlist } from '~/entities';
import { mockProduct, mockUser } from '~/common/mocks';

describe('WishlistService', () => {
  let service: WishlistService;
  let usersRepository: UsersRepository;
  let productsRepository: ProductsRepository;
  let wishlistRepository: WishlistRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WishlistService,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ProductsRepository),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(WishlistRepository),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue({
              relation: jest.fn().mockReturnThis(),
              of: jest.fn().mockReturnThis(),
              add: jest.fn(),
              remove: jest.fn(),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<WishlistService>(WishlistService);
    usersRepository = module.get<UsersRepository>(
      getRepositoryToken(UsersRepository),
    );
    productsRepository = module.get<ProductsRepository>(
      getRepositoryToken(ProductsRepository),
    );
    wishlistRepository = module.get<WishlistRepository>(
      getRepositoryToken(WishlistRepository),
    );
  });

  it('should throw NotFoundException if product not found', async () => {
    jest.spyOn(productsRepository, 'findOne').mockResolvedValue(null);

    await expect(
      service.addToWishlist('7af4e182-bde0-4a11-bb08-6d56c2830f21', 1),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException if wishlist not found', async () => {
    jest.spyOn(wishlistRepository, 'findOne').mockResolvedValue(null);

    await expect(
      service.addToWishlist('7af4e182-bde0-4a11-bb08-6d56c2830f21', 1),
    ).rejects.toThrow(NotFoundException);
  });

  it('should add product to wishlist', async () => {
    const mockWishlist = new Wishlist();
    mockWishlist.products = [];

    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(mockUser);
    jest.spyOn(productsRepository, 'findOne').mockResolvedValue(mockProduct);
    jest.spyOn(wishlistRepository, 'findOne').mockResolvedValue(mockWishlist);

    await service.addToWishlist('7af4e182-bde0-4a11-bb08-6d56c2830f21', 1);

    expect(
      wishlistRepository
        .createQueryBuilder()
        .relation('products')
        .of(mockWishlist).add,
    ).toHaveBeenCalledWith(mockProduct);
  });

  it('should return paginated wishlist products', async () => {
    const mockWishlist = new Wishlist();
    mockWishlist.products = [mockProduct];

    jest.spyOn(wishlistRepository, 'findOne').mockResolvedValue(mockWishlist);
    jest.spyOn(productsRepository, 'find').mockResolvedValue([mockProduct]);

    const result = await service.getWishlistProducts(
      '7af4e182-bde0-4a11-bb08-6d56c2830f21',
      1,
      1,
    );

    expect(result).toEqual({
      products: [mockProduct],
      totalCount: 1,
      totalPages: 1,
    });
  });

  it('should return all wishlist products', async () => {
    const mockWishlist = new Wishlist();
    mockWishlist.products = [mockProduct];

    jest.spyOn(wishlistRepository, 'findOne').mockResolvedValue(mockWishlist);

    const result = await service.getEntireWishlist(
      '7af4e182-bde0-4a11-bb08-6d56c2830f21',
    );

    expect(result).toEqual([mockProduct]);
  });
});
