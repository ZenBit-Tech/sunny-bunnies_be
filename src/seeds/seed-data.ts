import { Gender, ProductStatus } from '../entities/product.entity';

const colorsSeedData = [
  { name: 'red' },
  { name: 'orange' },
  { name: 'yellow' },
  { name: 'green' },
  { name: 'blue' },
  { name: 'white' },
  { name: 'black' },
  { name: 'Other' },
];

const categoriesSeedData = [
  { name: 'clothing' },
  { name: 'accessories' },
  { name: 'bags' },
  { name: 'shoes' },
  { name: 'designers' },
  { name: 'Other' },
];

const sizesSeedData = [
  { name: 'xs' },
  { name: 's' },
  { name: 'm' },
  { name: 'l' },
  { name: 'xl' },
  { name: 'Other' },
];

const stylesSeedData = [
  { name: 'essentials' },
  { name: 'casual' },
  { name: 'event dressing' },
  { name: 'wedding guest' },
  { name: 'street style' },
  { name: 'Other' },
];

const brandsSeedData = [
  { name: 'H&M' },
  { name: 'Adidas' },
  { name: 'Prada' },
  { name: 'Gucci' },
  { name: 'Nike' },
  { name: 'Other' },
];

const materialsSeedData = [
  { name: 'Cotton' },
  { name: 'Leather' },
  { name: 'Denim' },
  { name: 'Wool' },
  { name: 'Silk' },
  { name: 'Other' },
];

const imageSeedData = [
  {
    url: 'https://thumbs.dreamstime.com/z/photography-woman-wearing-green-dress-114378751.jpg',
    description: 'green dress',
    created_at: new Date(2024, 2, 15),
  },
  {
    url: 'https://thumbs.dreamstime.com/z/photography-woman-wearing-green-dress-114378751.jpg',
    description: 'shoes',
    created_at: new Date(2024, 3, 15),
  },
  {
    url: 'https://thumbs.dreamstime.com/z/photography-woman-wearing-green-dress-114378751.jpg',
    description: 'pants',
    created_at: new Date(2024, 2, 6),
  },
  {
    url: 'https://thumbs.dreamstime.com/z/photography-woman-wearing-green-dress-114378751.jpg',
    description: 'nike',
    created_at: new Date(2024, 2, 25),
  },
];

const productsSeedData = [
  {
    name: 'Green dress',
    description: 'Long green dress',
    quantity: 10,
    gender: Gender.Female,
    status: ProductStatus.Both,
    price_from: 100,
    price_to: 150,
    image_id: 1,
    size_id: 1,
    category_id: 1,
    color_id: 1,
    style_id: 1,
    brand_id: 1,
    material_id: 1,
    created_at: new Date(2024, 4, 25),
    updated_at: new Date(),
  },
  {
    name: 'Shoes',
    description: 'Shoes',
    quantity: 2,
    gender: Gender.Male,
    status: ProductStatus.Both,
    price_from: 200,
    price_to: 250,
    image_id: 2,
    size_id: 3,
    category_id: 4,
    color_id: 6,
    style_id: 2,
    brand_id: 5,
    material_id: 2,
    created_at: new Date(2024, 5, 25),
    updated_at: new Date(),
  },
  {
    name: 'Pants',
    description: 'pants',
    quantity: 4,
    gender: Gender.Female,
    status: ProductStatus.Both,
    price_from: 200,
    price_to: 220,
    image_id: 3,
    size_id: 2,
    category_id: 1,
    color_id: 6,
    style_id: 2,
    brand_id: 4,
    material_id: 3,
    created_at: new Date(2024, 6, 25),
    updated_at: new Date(),
  },
  {
    name: 'Shoes',
    description: 'Shoes nike',
    quantity: 2,
    gender: Gender.Male,
    status: ProductStatus.Both,
    price_from: 150,
    price_to: 170,
    image_id: 4,
    size_id: 3,
    category_id: 4,
    color_id: 6,
    style_id: 2,
    brand_id: 4,
    material_id: 3,
    created_at: new Date(2024, 7, 25),
    updated_at: new Date(),
  },
];

export {
  brandsSeedData,
  colorsSeedData,
  categoriesSeedData,
  imageSeedData,
  materialsSeedData,
  productsSeedData,
  sizesSeedData,
  stylesSeedData,
};
