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
  SizeEntity,
  StyleEntity,
  User,
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
  usersSeedData,
} from './seed-data';

export class CombinedSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await this.disableForeignKeyChecks(dataSource);
    await this.seedColors(dataSource);
    await this.seedCategories(dataSource);
    await this.seedSizes(dataSource);
    await this.seedStyles(dataSource);
    await this.seedBrands(dataSource);
    await this.seedImages(dataSource);
    await this.seedMaterials(dataSource);
    await this.seedUsers(dataSource);
    await this.seedProducts(dataSource);
    await this.enableForeignKeyChecks(dataSource);
  }

  private async disableForeignKeyChecks(dataSource: DataSource): Promise<void> {
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
  }

  private async enableForeignKeyChecks(dataSource: DataSource): Promise<void> {
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  private async seedColors(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE colors;');
    const repository = dataSource.getRepository(ColorEntity);
    await repository.insert(colorsSeedData);
  }

  private async seedCategories(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE categories;');
    const repository = dataSource.getRepository(CategoryEntity);
    await repository.insert(categoriesSeedData);
  }

  private async seedSizes(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE sizes;');
    const repository = dataSource.getRepository(SizeEntity);
    await repository.insert(sizesSeedData);
  }

  private async seedStyles(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE styles;');
    const repository = dataSource.getRepository(StyleEntity);
    await repository.insert(stylesSeedData);
  }

  private async seedImages(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE product_images;');
    const repository = dataSource.getRepository(ImageEntity);
    await repository.insert(imageSeedData);
  }

  private async seedMaterials(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE materials;');
    const repository = dataSource.getRepository(MaterialEntity);
    await repository.insert(materialsSeedData);
  }

  private async seedBrands(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE brands;');
    const repository = dataSource.getRepository(BrandEntity);
    await repository.insert(brandsSeedData);
  }

  private async seedUsers(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE users;');
    const repository = dataSource.getRepository(User);
    await repository.insert(usersSeedData);
  }

  private async seedProducts(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE products;');
    await dataSource.query('TRUNCATE TABLE product_variants;');
    const repository = dataSource.getRepository(ProductEntity);
    const imageRepository = dataSource.getRepository(ImageEntity);
    const variantRepository = dataSource.getRepository(ProductVariantEntity);

    const seedOperations = productsSeedData.map(async (product) => {
      const { variants, image_ids: imageIds, ...productData } = product;

      async function fetchImageById(
        imageId: number,
      ): Promise<ImageEntity | null> {
        return imageRepository.findOne({ where: { id: imageId } });
      }

      const images = await Promise.all(imageIds.map(fetchImageById));

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
        images,
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
}
