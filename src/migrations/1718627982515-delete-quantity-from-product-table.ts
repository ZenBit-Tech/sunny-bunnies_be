import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const TableName = {
  PRODUCTS: 'products',
};

const ColumnName = {
  QUANTITY: 'quantity',
};

export class RemoveQuantityFromProductsTable1718627982515
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(TableName.PRODUCTS, ColumnName.QUANTITY);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      TableName.PRODUCTS,
      new TableColumn({
        name: ColumnName.QUANTITY,
        type: 'int',
        isNullable: false,
      }),
    );
  }
}
