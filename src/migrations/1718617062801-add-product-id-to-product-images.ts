import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const TableName = {
  PRODUCT_IMAGES: 'product_images',
  PRODUCTS: 'products',
};

const ColumnName = {
  ID: 'id',
  PRODUCT_ID: 'product_id',
};

export class AddProductIdToProductImages1718617062801
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      TableName.PRODUCT_IMAGES,
      new TableColumn({
        name: ColumnName.PRODUCT_ID,
        type: 'int',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      TableName.PRODUCT_IMAGES,
      new TableForeignKey({
        columnNames: [ColumnName.PRODUCT_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.PRODUCTS,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      TableName.PRODUCT_IMAGES,
      ColumnName.PRODUCT_ID,
    );
  }
}
