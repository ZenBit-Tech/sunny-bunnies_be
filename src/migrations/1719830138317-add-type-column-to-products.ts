import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const TableName = {
  PRODUCTS: 'products',
  TYPES: 'types',
};

const ColumnName = {
  ID: 'id',
  TYPE_ID: 'type_id',
};

export class UpdateProductsTable1719830138317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      TableName.PRODUCTS,
      new TableColumn({
        name: ColumnName.TYPE_ID,
        type: 'int',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(TableName.PRODUCTS, ColumnName.TYPE_ID);
  }
}
