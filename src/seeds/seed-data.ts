import { randomUUID } from 'crypto';

import { Gender, ProductActivityStatus, ProductStatus } from '~/common/enums';

enum UserRole {
  VENDOR = 'vendor',
}

const colorsSeedData = [
  { id: 1, name: 'Red' },
  { id: 2, name: 'Orange' },
  { id: 3, name: 'Yellow' },
  { id: 4, name: 'Green' },
  { id: 5, name: 'blue' },
  { id: 6, name: 'White' },
  { id: 7, name: 'Black' },
];

const categoriesSeedData = [
  { id: 1, name: 'Clothing' },
  { id: 2, name: 'Accessories' },
  { id: 3, name: 'Bags' },
  { id: 4, name: 'Shoes' },
  { id: 5, name: 'Designers' },
  { id: 6, name: 'Other' },
];

const sizesSeedData = [
  { id: 1, name: 'XS' },
  { id: 2, name: 'S' },
  { id: 3, name: 'M' },
  { id: 4, name: 'L' },
  { id: 5, name: 'XL' },
  { id: 6, name: '40' },
  { id: 7, name: '42' },
  { id: 8, name: '43' },
];

const stylesSeedData = [
  { id: 1, name: 'essentials' },
  { id: 2, name: 'casual' },
  { id: 3, name: 'event dressing' },
  { id: 4, name: 'wedding guest' },
  { id: 5, name: 'street style' },
  { id: 6, name: 'other' },
];

const brandsSeedData = [
  { id: 1, name: 'H&M' },
  { id: 2, name: 'Adidas' },
  { id: 3, name: 'Prada' },
  { id: 4, name: 'Gucci' },
  { id: 5, name: 'Nike' },
  { id: 6, name: 'Other' },
];

const materialsSeedData = [
  { id: 1, name: 'cotton' },
  { id: 2, name: 'leather' },
  { id: 3, name: 'denim' },
  { id: 4, name: 'wool' },
  { id: 5, name: 'silk' },
  { id: 6, name: 'other' },
];

const imageSeedData = [
  {
    id: 1,
    url: 'https://thumbs.dreamstime.com/z/photography-woman-wearing-green-dress-114378751.jpg',
    description: 'green dress',
    created_at: new Date(2024, 2, 15),
    product_id: 1,
  },
  {
    id: 2,
    url: 'https://thumbs.dreamstime.com/z/leather-shoes-26612971.jpg?ct=jpeg',
    description: 'shoes',
    created_at: new Date(2024, 3, 15),
    product_id: 2,
  },
  {
    id: 3,
    url: 'https://thumbs.dreamstime.com/z/chino-pants-24575402.jpg?ct=jpeg',
    description: 'pants',
    created_at: new Date(2024, 2, 6),
    product_id: 3,
  },
  {
    id: 4,
    url: 'https://thumbs.dreamstime.com/z/long-pants-10608909.jpg?w=576',
    description: 'pants',
    created_at: new Date(2024, 2, 6),
    product_id: 3,
  },
  {
    id: 5,
    url: 'https://thumbs.dreamstime.com/z/mens-pants-isolated-white-background-dress-trousers-against-98716291.jpg?ct=jpeg',
    description: 'pants',
    created_at: new Date(2024, 2, 6),
    product_id: 3,
  },
  {
    id: 6,
    url: 'https://thumbs.dreamstime.com/b/nike-sport-shoes-18343734.jpg?w=768',
    description: 'nike',
    created_at: new Date(2024, 2, 25),
    product_id: 4,
  },
  {
    id: 7,
    url: 'https://thumbs.dreamstime.com/z/portrait-glamorous-lady-fashion-accessories-watches-red-cl-clutch-blue-background-48621018.jpg?ct=jpeg',
    description: 'red bag',
    created_at: new Date(2024, 4, 25),
    product_id: 5,
  },
  {
    id: 8,
    url: 'https://thumbs.dreamstime.com/z/colorful-makeup-hair-accessories-beauty-girl-portrait-32449784.jpg?ct=jpeg',
    description: 'accessory',
    created_at: new Date(2024, 4, 25),
    product_id: 6,
  },
];

const usersSeedData = [
  {
    id: randomUUID(),
    name: 'Joe Dou',
    email: 'vendor1@example.com',
    passwordHash: 'hashedpassword1',
    passwordSalt: 'saltsalt1',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: 'Ben Gran',
    email: 'vendor2@example.com',
    passwordHash: 'hashedpassword2',
    passwordSalt: 'saltsalt2',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const profilesSeedData = [
  {
    id: randomUUID(),
    user_id: usersSeedData[0].id,
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
    id: randomUUID(),
    user_id: usersSeedData[1].id,
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

const reviewsSeedData = [
  {
    id: 7,
    review:
      'This vendor provides outstanding service and high-quality products. I am thoroughly impressed with their professionalism and attention to detail. From start to finish, my experience with them has been nothing short of exceptional. I highly recommend their services to anyone looking for reliability and top-notch performance.',
    review_user_id: usersSeedData[0].id,
    reviewed_user_id: usersSeedData[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    review: `I have been consistently amazed by the excellent products offered by this vendor. Their attention to quality and customer satisfaction is truly commendable. Each time I order from them, I am met with products that exceed my expectations. I can confidently say that choosing this vendor was one of the best decisions I've made for my business.`,
    review_user_id: usersSeedData[0].id,
    reviewed_user_id: usersSeedData[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    review: `Great customer service and fast delivery. Their products are exactly as described and of excellent quality. I will definitely be ordering from them again!`,
    review_user_id: usersSeedData[0].id,
    reviewed_user_id: usersSeedData[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    review: `I am very pleased with my purchase. The vendor was responsive and helpful throughout the transaction. The product arrived on time and in perfect condition. Highly recommended!`,
    review_user_id: usersSeedData[0].id,
    reviewed_user_id: usersSeedData[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    review: `Top-notch service! The vendor exceeded my expectations with their prompt communication and high-quality products. I will definitely be a returning customer.`,
    review_user_id: usersSeedData[0].id,
    reviewed_user_id: usersSeedData[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 12,
    review: `Excellent products!`,
    review_user_id: usersSeedData[0].id,
    reviewed_user_id: usersSeedData[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const productsSeedData = [
  {
    id: 1,
    name: 'Green dress',
    description:
      'Elegant and flowing long green dress, perfect for formal occasions or a night out. Made from high-quality fabric that drapes beautifully, providing both comfort and style. Available in multiple sizes and colors.',
    gender: Gender.FEMALE,
    status: ProductStatus.FOR_RENT,
    activity_status: ProductActivityStatus.ACTIVE,
    min_price: 100,
    max_price: 150,
    category_id: 1,
    style_id: 1,
    brand_id: 1,
    material_id: 1,
    user_id: usersSeedData[0].id,
    variants: [
      { size_id: 1, color_id: 1, quantity: 5 },
      { size_id: 2, color_id: 2, quantity: 3 },
      { size_id: 3, color_id: 3, quantity: 2 },
    ],
    created_at: new Date(2024, 4, 25),
    updated_at: new Date(),
  },
  {
    id: 2,
    name: 'Shoes',
    description:
      'High-quality shoes designed for both comfort and style. Ideal for everyday wear or special occasions. Available in various sizes and colors to suit different preferences. Durable and stylish footwear for men.',
    gender: Gender.MALE,
    status: ProductStatus.FOR_RENT,
    activity_status: ProductActivityStatus.ACTIVE,
    min_price: 200,
    max_price: 250,
    category_id: 4,
    style_id: 2,
    brand_id: 5,
    material_id: 2,
    user_id: usersSeedData[0].id,
    variants: [
      { size_id: 6, color_id: 6, quantity: 5 },
      { size_id: 7, color_id: 5, quantity: 3 },
    ],
    created_at: new Date(2024, 5, 25),
    updated_at: new Date(),
  },
  {
    id: 3,
    name: 'Pants',
    description:
      'Stylish and comfortable pants for women. Perfect for both casual and formal settings. Made from premium materials that offer durability and a great fit. Available in multiple sizes and colors to match your wardrobe.',
    gender: Gender.FEMALE,
    status: ProductStatus.FOR_RENT,
    activity_status: ProductActivityStatus.ACTIVE,
    min_price: 200,
    max_price: 220,
    category_id: 1,
    style_id: 2,
    brand_id: 4,
    material_id: 3,
    user_id: usersSeedData[0].id,
    variants: [
      { size_id: 1, color_id: 1, quantity: 5 },
      { size_id: 2, color_id: 2, quantity: 3 },
      { size_id: 4, color_id: 3, quantity: 3 },
    ],
    created_at: new Date(2024, 6, 25),
    updated_at: new Date(),
  },
  {
    id: 4,
    name: 'Shoes',
    description:
      'Stylish and comfortable pants for women. Perfect for both casual and formal settings. Made from premium materials that offer durability and a great fit. Available in multiple sizes and colors to match your wardrobe.',
    gender: Gender.MALE,
    status: ProductStatus.FOR_RENT,
    activity_status: ProductActivityStatus.ACTIVE,
    min_price: 150,
    max_price: 170,
    category_id: 4,
    style_id: 2,
    brand_id: 4,
    material_id: 2,
    user_id: usersSeedData[1].id,
    variants: [
      { size_id: 6, color_id: 6, quantity: 5 },
      { size_id: 7, color_id: 4, quantity: 3 },
      { size_id: 8, color_id: 2, quantity: 3 },
    ],
    created_at: new Date(2024, 7, 25),
    updated_at: new Date(),
  },
  {
    id: 5,
    name: 'Red bag',
    description:
      'Chic and stylish red bag perfect for adding a pop of color to any outfit. Spacious and functional, ideal for daily use or special events. Made from high-quality materials, ensuring durability and a sleek look.',
    gender: Gender.FEMALE,
    status: ProductStatus.FOR_RENT,
    activity_status: ProductActivityStatus.ACTIVE,
    min_price: 250,
    max_price: 270,
    category_id: 3,
    style_id: 3,
    brand_id: 3,
    material_id: 6,
    user_id: usersSeedData[1].id,
    variants: [{ color_id: 1, quantity: 5 }],
    created_at: new Date(2024, 7, 25),
    updated_at: new Date(),
  },
  {
    id: 6,
    name: 'Accessory',
    description:
      'Elegant and versatile accessory to complement any outfit. Perfect for adding a touch of sophistication to your look. Available in various styles and colors to suit your personal taste. Made with high-quality materials for lasting use.',
    gender: Gender.FEMALE,
    status: ProductStatus.FOR_SALE,
    activity_status: ProductActivityStatus.ACTIVE,
    min_price: 50,
    max_price: 70,
    category_id: 2,
    style_id: 2,
    brand_id: 4,
    material_id: 6,
    user_id: usersSeedData[1].id,
    variants: [{ color_id: 6, quantity: 5 }],
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
