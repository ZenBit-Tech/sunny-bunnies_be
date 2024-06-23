import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const TableName = {
  PRODUCTS: 'products',
  PRODUCT_IMAGES: 'product_images',
};

const ColumnName = {
  ID: 'id',
  IMAGE_ID: 'image_id',
};

export class RemoveImageIdFromProductsTable1717426580704
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(TableName.PRODUCTS);
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(ColumnName.IMAGE_ID) !== -1,
    );

    if (foreignKey) {
      await queryRunner.dropForeignKey(TableName.PRODUCTS, foreignKey.name);
    }

    await queryRunner.dropColumn(TableName.PRODUCTS, ColumnName.IMAGE_ID);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      TableName.PRODUCTS,
      new TableColumn({
        name: ColumnName.IMAGE_ID,
        type: 'int',
        isNullable: true,
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
  }
}
