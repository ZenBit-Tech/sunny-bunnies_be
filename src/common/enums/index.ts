enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

enum ProductStatus {
  FOR_SALE = 'forSale',
  FOR_RENT = 'forRent',
  BOTH = 'both',
}

enum DataBaseTables {
  COLORS = 'colors',
  CATEGORIES = 'categories',
  SIZES = 'sizes',
  STYLES = 'styles',
  PRODUCT_IMAGES = 'product_images',
  PRODUCTS_SIZES = 'product_sizes',
  PRODUCT_VARIANTS = 'product_variants',
  BRANDS = 'brands',
  MATERIALS = 'materials',
  PRODUCTS = 'products',
}

export { DataBaseTables, Gender, ProductStatus };
