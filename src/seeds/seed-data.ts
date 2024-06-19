import { Gender, ProductStatus } from '~/common/enums';

enum UserRole {
  VENDOR = 'vendor',
}

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
  { name: 'other' },
];

const sizesSeedData = [
  { name: 'xs' },
  { name: 's' },
  { name: 'm' },
  { name: 'l' },
  { name: 'xl' },
  { name: 'other' },
];

const stylesSeedData = [
  { name: 'essentials' },
  { name: 'casual' },
  { name: 'event dressing' },
  { name: 'wedding guest' },
  { name: 'street style' },
  { name: 'other' },
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
  { name: 'cotton' },
  { name: 'leather' },
  { name: 'denim' },
  { name: 'wool' },
  { name: 'silk' },
  { name: 'other' },
];

const imageSeedData = [
  {
    url: 'https://thumbs.dreamstime.com/z/photography-woman-wearing-green-dress-114378751.jpg',
    description: 'green dress',
    created_at: new Date(2024, 2, 15),
  },
  {
    url: 'https://thumbs.dreamstime.com/z/leather-shoes-26612971.jpg?ct=jpeg',
    description: 'shoes',
    created_at: new Date(2024, 3, 15),
  },
  {
    url: 'https://thumbs.dreamstime.com/z/chino-pants-24575402.jpg?ct=jpeg',
    description: 'pants',
    created_at: new Date(2024, 2, 6),
  },
  {
    url: 'https://thumbs.dreamstime.com/z/long-pants-10608909.jpg?w=576',
    description: 'pants',
    created_at: new Date(2024, 2, 6),
  },
  {
    url: 'https://thumbs.dreamstime.com/z/mens-pants-isolated-white-background-dress-trousers-against-98716291.jpg?ct=jpeg',
    description: 'pants',
    created_at: new Date(2024, 2, 6),
  },
  {
    url: 'https://thumbs.dreamstime.com/b/nike-sport-shoes-18343734.jpg?w=768',
    description: 'nike',
    created_at: new Date(2024, 2, 25),
  },
  {
    url: 'https://thumbs.dreamstime.com/z/portrait-glamorous-lady-fashion-accessories-watches-red-cl-clutch-blue-background-48621018.jpg?ct=jpeg',
    description: 'red bag',
    created_at: new Date(2024, 4, 25),
  },
  {
    url: 'https://thumbs.dreamstime.com/z/colorful-makeup-hair-accessories-beauty-girl-portrait-32449784.jpg?ct=jpeg',
    description: 'accessory',
    created_at: new Date(2024, 4, 25),
  },
];

const reviewsSeedData = [
  {
    id: 7,
    review: 'Great service!',
    review_user_id: 'vendor-1',
    reviewed_user_id: 'vendor-2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    review: 'Excellent products!',
    review_user_id: 'vendor-2',
    reviewed_user_id: 'vendor-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const profilesSeedData = [
  {
    user_id: 'vendor-1',
    role: UserRole.VENDOR,
    phoneNumber: '123456789',
    profilePhoto:
      'https://thumbs.dreamstime.com/z/red-smiley-face-1839222.jpg?ct=jpeg',
    addressLineOne: '123 Vendor Street',
    addressLineTwo: '',
    country: 'Country',
    state: 'State',
    city: 'City',
    clothesSize: 'XL',
    jeansSize: '34',
    shoeSize: '10',
    isRegistrationCompleted: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user_id: 'vendor-2',
    role: UserRole.VENDOR,
    phoneNumber: '987654321',
    profilePhoto:
      'https://thumbs.dreamstime.com/z/beautiful-pleased-smiling-cartoon-brunette-girl-dark-chocolate-hair-portrait-isolated-white-background-beautiful-pleased-188685252.jpg?ct=jpeg',
    addressLineOne: '456 Vendor Avenue',
    addressLineTwo: 'Apt 200',
    country: 'Country',
    state: 'State',
    city: 'City',
    clothesSize: 'L',
    jeansSize: '32',
    shoeSize: '9',
    isRegistrationCompleted: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const usersSeedData = [
  {
    id: 'vendor-1',
    name: 'Vendor One',
    email: 'vendor1@example.com',
    passwordHash: 'hashedpassword1',
    passwordSalt: 'saltsalt1',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'vendor-2',
    name: 'Vendor Two',
    email: 'vendor2@example.com',
    passwordHash: 'hashedpassword2',
    passwordSalt: 'saltsalt2',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const productsSeedData = [
  {
    name: 'Green dress',
    description: 'Long green dress',
    quantity: 10,
    gender: Gender.FEMALE,
    status: ProductStatus.BOTH,
    min_price: 100,
    max_price: 150,
    image_ids: [1],
    category_id: 1,
    style_id: 1,
    brand_id: 1,
    material_id: 1,
    user_id: 'vendor-1',
    variants: [
      { size_id: 1, color_id: 1, quantity: 5 },
      { size_id: 2, color_id: 1, quantity: 3 },
      { size_id: 3, color_id: 1, quantity: 2 },
    ],
    created_at: new Date(2024, 4, 25),
    updated_at: new Date(),
  },
  {
    name: 'Shoes',
    description: 'Shoes',
    quantity: 2,
    gender: Gender.MALE,
    status: ProductStatus.BOTH,
    min_price: 200,
    max_price: 250,
    image_ids: [2],
    category_id: 4,
    style_id: 2,
    brand_id: 5,
    material_id: 2,
    user_id: 'vendor-1',
    variants: [
      { size_id: 1, color_id: 6, quantity: 5 },
      { size_id: 2, color_id: 6, quantity: 3 },
    ],
    created_at: new Date(2024, 5, 25),
    updated_at: new Date(),
  },
  {
    name: 'Pants',
    description: 'pants',
    quantity: 4,
    gender: Gender.FEMALE,
    status: ProductStatus.BOTH,
    min_price: 200,
    max_price: 220,
    image_ids: [3, 4, 5],
    category_id: 1,
    style_id: 2,
    brand_id: 4,
    material_id: 3,
    user_id: 'vendor-1',
    variants: [
      { size_id: 1, color_id: 8, quantity: 5 },
      { size_id: 2, color_id: 8, quantity: 3 },
      { size_id: 4, color_id: 8, quantity: 3 },
    ],
    created_at: new Date(2024, 6, 25),
    updated_at: new Date(),
  },
  {
    name: 'Shoes',
    description: 'Shoes nike',
    quantity: 2,
    gender: Gender.MALE,
    status: ProductStatus.BOTH,
    min_price: 150,
    max_price: 170,
    image_ids: [5],
    category_id: 4,
    style_id: 2,
    brand_id: 4,
    material_id: 3,
    user_id: 'vendor-2',
    variants: [
      { size_id: 1, color_id: 6, quantity: 5 },
      { size_id: 2, color_id: 6, quantity: 3 },
      { size_id: 3, color_id: 6, quantity: 3 },
    ],
    created_at: new Date(2024, 7, 25),
    updated_at: new Date(),
  },
  {
    name: 'Red bag',
    description: 'Red bag',
    quantity: 2,
    gender: Gender.FEMALE,
    status: ProductStatus.FOR_RENT,
    min_price: 250,
    max_price: 270,
    image_ids: [7],
    category_id: 3,
    style_id: 3,
    brand_id: 3,
    material_id: 6,
    user_id: 'vendor-2',
    variants: [{ size_id: 1, color_id: 1, quantity: 5 }],
    created_at: new Date(2024, 7, 25),
    updated_at: new Date(),
  },
  {
    name: 'Accessory',
    description: 'Accessory',
    quantity: 2,
    gender: Gender.FEMALE,
    status: ProductStatus.FOR_SALE,
    min_price: 50,
    max_price: 70,
    image_ids: [8],
    category_id: 2,
    style_id: 2,
    brand_id: 4,
    material_id: 6,
    user_id: 'vendor-2',
    variants: [{ size_id: 1, color_id: 8, quantity: 5 }],
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
  profilesSeedData,
  productsSeedData,
  sizesSeedData,
  stylesSeedData,
  reviewsSeedData,
  usersSeedData,
};
