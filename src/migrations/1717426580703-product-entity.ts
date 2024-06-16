import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { DataBaseTables } from '~/common/enums';

export class CreateProductTable1717426580703 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DataBaseTables.PRODUCTS,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'gender',
            type: 'enum',
            enum: ['male', 'female'],
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['forSale', 'forRent', 'both'],
          },
          {
            name: 'min_price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'max_price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'image_id',
            type: 'int',
          },
          {
            name: 'size_id',
            type: 'int',
          },
          {
            name: 'category_id',
            type: 'int',
          },
          {
            name: 'color_id',
            type: 'int',
          },
          {
            name: 'style_id',
            type: 'int',
          },
          {
            name: 'brand_id',
            type: 'int',
          },
          {
            name: 'material_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      DataBaseTables.PRODUCTS,
      new TableForeignKey({
        columnNames: ['image_id'],
        referencedColumnNames: ['id'],
        referencedTableName: DataBaseTables.PRODUCT_IMAGES,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      DataBaseTables.PRODUCTS,
      new TableForeignKey({
        columnNames: ['size_id'],
        referencedColumnNames: ['id'],
        referencedTableName: DataBaseTables.SIZES,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      DataBaseTables.PRODUCTS,
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: DataBaseTables.CATEGORIES,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      DataBaseTables.PRODUCTS,
      new TableForeignKey({
        columnNames: ['color_id'],
        referencedColumnNames: ['id'],
        referencedTableName: DataBaseTables.COLORS,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      DataBaseTables.PRODUCTS,
      new TableForeignKey({
        columnNames: ['style_id'],
        referencedColumnNames: ['id'],
        referencedTableName: DataBaseTables.STYLES,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      DataBaseTables.PRODUCTS,
      new TableForeignKey({
        columnNames: ['brand_id'],
        referencedColumnNames: ['id'],
        referencedTableName: DataBaseTables.BRANDS,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      DataBaseTables.PRODUCTS,
      new TableForeignKey({
        columnNames: ['material_id'],
        referencedColumnNames: ['id'],
        referencedTableName: DataBaseTables.MATERIALS,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(DataBaseTables.PRODUCTS, 'FK_image_id');
    await queryRunner.dropTable(DataBaseTables.PRODUCTS);
  }
}
