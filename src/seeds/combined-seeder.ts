import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { DataBaseTables } from '../common/enums';
import {
  BrandEntity,
  CategoryEntity,
  ColorEntity,
  ImageEntity,
  MaterialEntity,
  ProductEntity,
  SizeEntity,
  StyleEntity,
} from '../entities/index';
import {
  colorsSeedData,
  categoriesSeedData,
  sizesSeedData,
  stylesSeedData,
  imageSeedData,
  brandsSeedData,
  materialsSeedData,
  productsSeedData,
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

  private async seedProducts(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE products;');
    const repository = dataSource.getRepository(ProductEntity);

    const seedOperations = productsSeedData.map(async (product) => {
      const { size_ids: sizeIds, ...productData } = product;

      const image = dataSource
        .getRepository(ImageEntity)
        .findOneBy({ id: product.image_id });
      const category = dataSource
        .getRepository(CategoryEntity)
        .findOneBy({ id: product.category_id });
      const color = dataSource
        .getRepository(ColorEntity)
        .findOneBy({ id: product.color_id });
      const style = dataSource
        .getRepository(StyleEntity)
        .findOneBy({ id: product.style_id });
      const brand = dataSource
        .getRepository(BrandEntity)
        .findOneBy({ id: product.brand_id });
      const material = dataSource
        .getRepository(MaterialEntity)
        .findOneBy({ id: product.material_id });

      const [
        resolvedImage,
        resolvedCategory,
        resolvedColor,
        resolvedStyle,
        resolvedBrand,
        resolvedMaterial,
      ] = await Promise.all([image, category, color, style, brand, material]);

      const insertedProduct = await repository.save({
        ...productData,
        image: resolvedImage,
        category: resolvedCategory,
        color: resolvedColor,
        style: resolvedStyle,
        brand: resolvedBrand,
        material: resolvedMaterial,
        minPrice: product.min_price,
        maxPrice: product.max_price,
      });

      const productSizeRepository = dataSource.getRepository(
        DataBaseTables.PRODUCTS_SIZES,
      );

      const insertOperations = sizeIds.map(
        (sizeId) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          productSizeRepository.insert({
            product_id: insertedProduct.id,
            size_id: sizeId,
          }),
        // eslint-disable-next-line function-paren-newline
      );

      await Promise.all(insertOperations);
    });

    await Promise.all(seedOperations);
  }
}
