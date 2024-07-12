import {
  CategoryEntity,
  StyleEntity,
  BrandEntity,
  MaterialEntity,
  ImageEntity,
  SizeEntity,
  ColorEntity,
  ProductVariantEntity,
  ProductEntity,
} from '~/entities';
import { Gender, ProductStatus, ProductActivityStatus } from '../enums';
import { mockUser } from './mock-user';

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

const mockProduct = {
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

export { mockProduct };
