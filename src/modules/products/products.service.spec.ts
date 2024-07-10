import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import {
  BrandEntity,
  CategoryEntity,
  ColorEntity,
  ImageEntity,
  MaterialEntity,
  ProductEntity,
  ProductVariantEntity,
  SizeEntity,
  StyleEntity,
  User,
} from '~/entities';
import { PRODUCTS_LIMIT } from '~/common/constants/constants';
import { Gender, ProductActivityStatus, ProductStatus } from '~/common/enums';

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  status: 'active',
  passwordHash: 'hashedpassword1',
  passwordSalt: 'salt1',
  isVerified: true,
  otpToken: null,
  deletedAt: null,
  products: [],
  followers: [],
  following: [],
  card: null,
  profile: null,
  ratingsReceived: [],
  ratingsGiven: [],
  reviewsReceived: [],
  reviewsGiven: [],
  createdAt: new Date(),
  updatedAt: new Date(),
} as User;

const mockCategory = {
  id: 1,
  name: 'Category 1',
} as CategoryEntity;

const mockStyle = {
  id: 1,
  name: 'Style 1',
} as StyleEntity;

const mockBrand = {
  id: 1,
  name: 'Brand 1',
} as BrandEntity;

const mockMaterial = {
  id: 1,
  name: 'Material 1',
} as MaterialEntity;

const mockImage = {
  id: 1,
  url: 'https://example.com/image1.jpg',
} as ImageEntity;

const mockSize = {
  id: 1,
  name: 'Size 1',
} as SizeEntity;

const mockColor = {
  id: 1,
  name: 'Color 1',
} as ColorEntity;

const mockVariant = {
  id: 1,
  quantity: 10,
  size: mockSize,
  color: mockColor,
  product: null,
} as ProductVariantEntity;

const mockProduct1 = {
  id: 1,
  name: 'Product 1',
  description: 'Description for product 1',
  gender: Gender.MALE,
  status: ProductStatus.FOR_RENT,
  activityStatus: ProductActivityStatus.ACTIVE,
  minPrice: 100.0,
  maxPrice: 200.0,
  images: [mockImage],
  variants: [mockVariant],
  category: mockCategory,
  style: mockStyle,
  brand: mockBrand,
  material: mockMaterial,
  user: mockUser,
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date(),
} as ProductEntity;

const mockProduct2 = {
  id: 2,
  name: 'Product 2',
  description: 'Description for product 2',
  gender: Gender.MALE,
  status: ProductStatus.FOR_RENT,
  activityStatus: ProductActivityStatus.INACTIVE,
  minPrice: 150.0,
  maxPrice: 250.0,
  images: [mockImage],
  variants: [mockVariant],
  category: mockCategory,
  style: mockStyle,
  brand: mockBrand,
  material: mockMaterial,
  user: mockUser,
  createdAt: new Date('2023-02-01'),
  updatedAt: new Date(),
} as ProductEntity;

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
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductsRepository>(ProductsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return products, totalCount, and totalPages', async () => {
      const products = [mockProduct1, mockProduct2];
      const totalCount = products.length;
      const query: GetProductsQueryDto = {
        limit: 1,
        offset: 0,
      };

      jest
        .spyOn(repository, 'findAll')
        .mockResolvedValue({ products, totalCount });

      const result = await service.findAll(query);

      expect(result).toEqual({
        products,
        totalCount,
        totalPages: Math.ceil(totalCount / query.limit),
      });
    });

    it('should use default limit if not provided in query', async () => {
      const products = [mockProduct1, mockProduct2];
      const totalCount = products.length;
      const query: GetProductsQueryDto = {
        offset: 0,
      };

      jest
        .spyOn(repository, 'findAll')
        .mockResolvedValue({ products, totalCount });

      const result = await service.findAll(query);

      expect(result).toEqual({
        products,
        totalCount,
        totalPages: Math.ceil(totalCount / PRODUCTS_LIMIT),
      });
    });

    it('should handle errors', async () => {
      const query: GetProductsQueryDto = {
        limit: 1,
        offset: 0,
      };
      const errorMessage = 'Some error';
      jest
        .spyOn(repository, 'findAll')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.findAll(query)).rejects.toThrow(errorMessage);
      expect(repository.findAll).toHaveBeenCalledWith(query);
    });

    it('should return products sorted by date in ascending order', async () => {
      const products = [mockProduct1, mockProduct2];
      const totalCount = products.length;
      const query: GetProductsQueryDto = {
        limit: 2,
        offset: 0,
        order: 'ASC',
      };

      jest
        .spyOn(repository, 'findAll')
        .mockResolvedValue({ products, totalCount });

      const result = await service.findAll(query);

      expect(result.products).toEqual([mockProduct1, mockProduct2]);
      expect(repository.findAll).toHaveBeenCalledWith(query);
    });

    it('should return products sorted by date in descending order', async () => {
      const products = [mockProduct2, mockProduct1];
      const totalCount = products.length;
      const query: GetProductsQueryDto = {
        limit: 2,
        offset: 0,
        order: 'DESC',
      };

      jest
        .spyOn(repository, 'findAll')
        .mockResolvedValue({ products, totalCount });

      const result = await service.findAll(query);

      expect(result.products).toEqual([mockProduct2, mockProduct1]);
      expect(repository.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe('findById', () => {
    const productId = 1;

    it('should return product by id', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(mockProduct1);

      const result = await service.findById(productId);

      expect(result).toEqual(mockProduct1);
      expect(repository.findById).toHaveBeenCalledWith(productId);
    });

    it('should throw NotFoundException if product not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(service.findById(productId)).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.findById).toHaveBeenCalledWith(productId);
    });
  });
});
