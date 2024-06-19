import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const TableName = {
  COLORS: 'colors',
  PRODUCTS: 'products',
  PRODUCT_VARIANTS: 'product_variants',
  SIZES: 'sizes',
};

const ColumnName = {
  ID: 'id',
  COLOR_ID: 'color_id',
  QUANTITY: 'quantity',
  PRODUCT_ID: 'product_id',
  SIZE_ID: 'size_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

export class CreateVariantsTable1717426580704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.PRODUCT_VARIANTS,
        columns: [
          {
            name: ColumnName.ID,
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: ColumnName.PRODUCT_ID,
            type: 'int',
          },
          {
            name: ColumnName.SIZE_ID,
            type: 'int',
          },
          {
            name: ColumnName.COLOR_ID,
            type: 'int',
          },
          {
            name: ColumnName.QUANTITY,
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
      TableName.PRODUCT_VARIANTS,
      new TableForeignKey({
        columnNames: [ColumnName.PRODUCT_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.PRODUCTS,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.PRODUCT_VARIANTS,
      new TableForeignKey({
        columnNames: [ColumnName.SIZE_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.SIZES,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.PRODUCT_VARIANTS,
      new TableForeignKey({
        columnNames: [ColumnName.COLOR_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.COLORS,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.PRODUCT_VARIANTS);
  }
}
