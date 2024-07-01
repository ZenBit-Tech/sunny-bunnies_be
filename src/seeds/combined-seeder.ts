import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import {
  BrandEntity,
  CategoryEntity,
  ColorEntity,
  ImageEntity,
  MaterialEntity,
  ProductEntity,
  ProductVariantEntity,
  UsersReview,
  SizeEntity,
  StyleEntity,
  User,
  UserProfile,
} from '~/entities';

import {
  colorsSeedData,
  categoriesSeedData,
  sizesSeedData,
  stylesSeedData,
  imageSeedData,
  brandsSeedData,
  materialsSeedData,
  productsSeedData,
  profilesSeedData,
  reviewsSeedData,
  usersSeedData,
} from './seed-data';

export class CombinedSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await this.disableForeignKeyChecks(dataSource);
    await this.truncateTables(dataSource);
    await this.seedColors(dataSource);
    await this.seedCategories(dataSource);
    await this.seedSizes(dataSource);
    await this.seedStyles(dataSource);
    await this.seedMaterials(dataSource);
    await this.seedBrands(dataSource);
    await this.seedUsers(dataSource);
    await this.seedProfiles(dataSource);
    await this.seedProducts(dataSource);
    await this.seedImages(dataSource);
    await this.seedReviews(dataSource);
    await this.enableForeignKeyChecks(dataSource);
  }

  private async disableForeignKeyChecks(dataSource: DataSource): Promise<void> {
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
  }

  private async truncateTables(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE product_images;');
    await dataSource.query('TRUNCATE TABLE products;');
    await dataSource.query('TRUNCATE TABLE product_variants;');
    await dataSource.query('TRUNCATE TABLE colors;');
    await dataSource.query('TRUNCATE TABLE categories;');
    await dataSource.query('TRUNCATE TABLE sizes;');
    await dataSource.query('TRUNCATE TABLE styles;');
    await dataSource.query('TRUNCATE TABLE brands;');
    await dataSource.query('TRUNCATE TABLE materials;');
    await dataSource.query('TRUNCATE TABLE users_reviews;');
  }

  private async enableForeignKeyChecks(dataSource: DataSource): Promise<void> {
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  private async seedColors(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ColorEntity);
    await repository.insert(colorsSeedData);
  }

  private async seedCategories(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(CategoryEntity);
    await repository.insert(categoriesSeedData);
  }

  private async seedSizes(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SizeEntity);
    await repository.insert(sizesSeedData);
  }

  private async seedStyles(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(StyleEntity);
    await repository.insert(stylesSeedData);
  }

  private async seedMaterials(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(MaterialEntity);
    await repository.insert(materialsSeedData);
  }

  private async seedBrands(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(BrandEntity);
    await repository.insert(brandsSeedData);
  }

  private async seedUsers(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(User);
    await repository.insert(usersSeedData);
  }

  private async seedProfiles(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const profileRepository = dataSource.getRepository(UserProfile);

    const seedOperations = profilesSeedData.map(async (profileData) => {
      const user = await userRepository.findOneOrFail({
        where: { id: profileData.user_id },
      });

      const profileEntity = profileRepository.create({
        ...profileData,
        user,
      });

      await profileRepository.save(profileEntity);
    });

    await Promise.all(seedOperations);
  }

  private async seedProducts(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ProductEntity);
    const variantRepository = dataSource.getRepository(ProductVariantEntity);

    const seedOperations = productsSeedData.map(async (product) => {
      const { variants, ...productData } = product;

      const category = dataSource
        .getRepository(CategoryEntity)
        .findOne({ where: { id: product.category_id } });
      const style = dataSource
        .getRepository(StyleEntity)
        .findOne({ where: { id: product.style_id } });
      const brand = dataSource
        .getRepository(BrandEntity)
        .findOne({ where: { id: product.brand_id } });
      const material = dataSource
        .getRepository(MaterialEntity)
        .findOne({ where: { id: product.material_id } });
      const user = dataSource
        .getRepository(User)
        .findOne({ where: { id: product.user_id } });

      const [
        resolvedCategory,
        resolvedStyle,
        resolvedBrand,
        resolvedMaterial,
        resolvedUser,
      ] = await Promise.all([category, style, brand, material, user]);

      const insertedProduct = await repository.save({
        ...productData,
        category: resolvedCategory,
        style: resolvedStyle,
        brand: resolvedBrand,
        user: resolvedUser,
        material: resolvedMaterial,
        minPrice: product.min_price,
        maxPrice: product.max_price,
      });

      const variantOperations = variants.map(async (variant) => {
        const size = await dataSource
          .getRepository(SizeEntity)
          .findOne({ where: { id: variant.size_id } });
        const color = await dataSource
          .getRepository(ColorEntity)
          .findOne({ where: { id: variant.color_id } });

        return variantRepository.save({
          product: insertedProduct,
          size,
          color,
          quantity: variant.quantity,
        });
      });

      await Promise.all(variantOperations);
    });

    await Promise.all(seedOperations);
  }

  private async seedImages(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ImageEntity);
    const productRepository = dataSource.getRepository(ProductEntity);

    const seedOperations = imageSeedData.map(async (imageData) => {
      const product = await productRepository.findOne({
        where: { id: imageData.product_id },
      });

      const imageEntity = repository.create({
        url: imageData.url,
        createdAt: imageData.created_at,
        product,
      });

      await repository.save(imageEntity);
    });

    await Promise.all(seedOperations);
  }

  private async seedReviews(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const reviewsRepository = dataSource.getRepository(UsersReview);

    const seedOperations = reviewsSeedData.map(async (reviewData) => {
      const reviewUser = await userRepository.findOneOrFail({
        where: { id: reviewData.review_user_id },
      });
      const reviewedUser = await userRepository.findOneOrFail({
        where: { id: reviewData.reviewed_user_id },
      });

      const reviewEntity = reviewsRepository.create({
        ...reviewData,
        reviewUser,
        reviewedUser,
      });

      await reviewsRepository.save(reviewEntity);
    });

    await Promise.all(seedOperations);
  }
}
