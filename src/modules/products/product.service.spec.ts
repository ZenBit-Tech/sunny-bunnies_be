import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { ProductEntity, User } from '~/entities';
import { ProductActivityStatus, ProductStatus } from '~/common/enums';
import { CreateProductDto } from './dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            createProductWithVariantsAndImages: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const query = {};
      const expectedResult: ProductEntity[] = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
        } as ProductEntity,
        {
          id: 2,
          name: 'Product 2',
          description: 'Description 2',
        } as ProductEntity,
      ];

      jest.spyOn(repository, 'findAll').mockResolvedValue(expectedResult);

      const result = await service.findAll(query);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findById', () => {
    it('should return a product if found', async () => {
      const productId = 1;
      const expectedProduct: ProductEntity = {
        id: productId,
        name: 'Product 1',
        description: 'Description 1',
      } as ProductEntity;

      jest.spyOn(repository, 'findById').mockResolvedValue(expectedProduct);

      const result = await service.findById(productId);

      expect(result).toEqual(expectedProduct);
    });

    it('should throw NotFoundException if product is not found', async () => {
      const productId = 999;

      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(service.findById(productId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const userId = 'user123';
      const createProductDto: CreateProductDto = {
        name: 'New Product',
        description: 'Description of New Product',
        minPrice: 10,
        maxPrice: 20,
        category: 1,
        type: 1,
        brand: 1,
        material: 1,
        style: 1,
        gender: 1,
        variants: [],
        images: [],
      };

      const expectedProduct: ProductEntity = {
        ...(createProductDto as unknown as ProductEntity),
        status: ProductStatus.FOR_RENT,
        activityStatus: ProductActivityStatus.INACTIVE,
        user: { id: userId } as User,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: 1,
      };

      jest
        .spyOn(repository, 'createProductWithVariantsAndImages')
        .mockResolvedValue(expectedProduct);

      const result = await service.create(userId, createProductDto);

      expect(result).toEqual(expectedProduct);
    });
  });
});
