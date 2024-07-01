import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDetailsService } from './product-details.service';
import {
  BrandEntity,
  CategoryEntity,
  ColorEntity,
  MaterialEntity,
  SizeEntity,
  StyleEntity,
} from '~/entities';
import { CategoriesRepository } from './categories.repository';

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
});

const mockCategoriesRepository = () => ({
  findAllWithTypes: jest.fn(),
  findSizesByCategoryId: jest.fn(),
});

describe('ProductDetailsService', () => {
  let service: ProductDetailsService;
  let brandRepository: Repository<BrandEntity>;
  let colorRepository: Repository<ColorEntity>;
  let materialRepository: Repository<MaterialEntity>;
  let styleRepository: Repository<StyleEntity>;
  let categoriesRepository: CategoriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductDetailsService,
        {
          provide: getRepositoryToken(BrandEntity),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(ColorEntity),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(MaterialEntity),
          useFactory: mockRepository,
        },
        { provide: getRepositoryToken(SizeEntity), useFactory: mockRepository },
        {
          provide: getRepositoryToken(StyleEntity),
          useFactory: mockRepository,
        },
        { provide: CategoriesRepository, useFactory: mockCategoriesRepository },
      ],
    }).compile();

    service = module.get<ProductDetailsService>(ProductDetailsService);
    brandRepository = module.get<Repository<BrandEntity>>(
      getRepositoryToken(BrandEntity),
    );
    colorRepository = module.get<Repository<ColorEntity>>(
      getRepositoryToken(ColorEntity),
    );
    materialRepository = module.get<Repository<MaterialEntity>>(
      getRepositoryToken(MaterialEntity),
    );
    styleRepository = module.get<Repository<StyleEntity>>(
      getRepositoryToken(StyleEntity),
    );
    categoriesRepository =
      module.get<CategoriesRepository>(CategoriesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all categories with types', async () => {
    const result = [];
    jest
      .spyOn(categoriesRepository, 'findAllWithTypes')
      .mockResolvedValue(result);
    expect(await service.findAllCategoriesWithTypes()).toEqual(result);
  });

  it('should return all styles', async () => {
    const result = [];
    jest.spyOn(styleRepository, 'find').mockResolvedValue(result);
    expect(await service.findAllStyles()).toEqual(result);
  });

  it('should return all brands', async () => {
    const result = [];
    jest.spyOn(brandRepository, 'find').mockResolvedValue(result);
    expect(await service.findAllBrands()).toEqual(result);
  });

  it('should return all materials', async () => {
    const result = [];
    jest.spyOn(materialRepository, 'find').mockResolvedValue(result);
    expect(await service.findAllMaterials()).toEqual(result);
  });

  it('should return all colors', async () => {
    const result = [];
    jest.spyOn(colorRepository, 'find').mockResolvedValue(result);
    expect(await service.findAllColors()).toEqual(result);
  });

  it('should return sizes by category ID', async () => {
    const categoryId = 1;
    const sizes: SizeEntity[] = [
      { id: 1, name: 'Small', categories: [] } as SizeEntity,
      { id: 2, name: 'Medium', categories: [] } as SizeEntity,
    ];
    jest
      .spyOn(categoriesRepository, 'findSizesByCategoryId')
      .mockResolvedValue(sizes);
    expect(await service.findAllSizesByCategory(categoryId)).toEqual(sizes);
  });
});
