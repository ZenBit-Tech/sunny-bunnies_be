import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const TableName = {
  COLORS: 'colors',
  CATEGORIES: 'categories',
  SIZES: 'sizes',
  STYLES: 'styles',
  PRODUCT_IMAGES: 'product_images',
  BRANDS: 'brands',
  MATERIALS: 'materials',
  PRODUCTS: 'products',
};

const ColumnName = {
  ID: 'id',
  NAME: 'name',
  DESCRIPTION: 'description',
  QUANTITY: 'quantity',
  GENDER: 'gender',
  STATUS: 'status',
  MIN_PRICE: 'min_price',
  MAX_PRICE: 'max_price',
  IMAGE_ID: 'image_id',
  SIZE_ID: 'size_id',
  CATEGORY_ID: 'category_id',
  COLOR_ID: 'color_id',
  STYLE_ID: 'style_id',
  BRAND_ID: 'brand_id',
  MATERIAL_ID: 'material_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

export class CreateProductTable1717426580703 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.PRODUCTS,
        columns: [
          {
            name: ColumnName.ID,
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: ColumnName.NAME,
            type: 'text',
          },
          {
            name: ColumnName.DESCRIPTION,
            type: 'text',
          },
          {
            name: ColumnName.GENDER,
            type: 'enum',
            enum: ['male', 'female'],
          },
          {
            name: ColumnName.STATUS,
            type: 'enum',
            enum: ['forSale', 'forRent', 'both'],
          },
          {
            name: ColumnName.MIN_PRICE,
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: ColumnName.MAX_PRICE,
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: ColumnName.IMAGE_ID,
            type: 'int',
          },
          {
            name: ColumnName.CATEGORY_ID,
            type: 'int',
          },
          {
            name: ColumnName.STYLE_ID,
            type: 'int',
          },
          {
            name: ColumnName.BRAND_ID,
            type: 'int',
          },
          {
            name: ColumnName.MATERIAL_ID,
            type: 'int',
          },
          {
            name: ColumnName.CREATED_AT,
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: ColumnName.UPDATED_AT,
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      TableName.PRODUCTS,
      new TableForeignKey({
        columnNames: [ColumnName.IMAGE_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.PRODUCT_IMAGES,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.PRODUCTS,
      new TableForeignKey({
        columnNames: [ColumnName.CATEGORY_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.CATEGORIES,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.PRODUCTS,
      new TableForeignKey({
        columnNames: [ColumnName.STYLE_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.STYLES,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.PRODUCTS,
      new TableForeignKey({
        columnNames: [ColumnName.BRAND_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.BRANDS,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.PRODUCTS,
      new TableForeignKey({
        columnNames: [ColumnName.MATERIAL_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.MATERIALS,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.PRODUCTS);
  }
}
