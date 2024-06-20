enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

enum ProductStatus {
  FOR_SALE = 'forSale',
  FOR_RENT = 'forRent',
  BOTH = 'both',
}

enum ProductActivityStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PUBLISHED = 'published',
  REJECTED = 'rejected',
}

export { Gender, ProductActivityStatus, ProductStatus };
