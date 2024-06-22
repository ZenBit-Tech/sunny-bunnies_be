import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const TableName = {
  COLORS: 'colors',
  PRODUCTS: 'products',
  SIZES: 'sizes',
};

const ColumnName = {
  COLORS: 'colors',
  ID: 'id',
  SIZE_ID: 'size_id',
  COLOR_ID: 'color_id',
};

export class RemoveSizeAndColorFromProductsTable1719094383169
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(TableName.PRODUCTS);
    const foreignKeySize = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(ColumnName.SIZE_ID) !== -1,
    );

    if (foreignKeySize) {
      await queryRunner.dropForeignKey(TableName.PRODUCTS, foreignKeySize.name);
    }

    const foreignKeyColor = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(ColumnName.COLOR_ID) !== -1,
    );

    if (foreignKeyColor) {
      await queryRunner.dropForeignKey(
        TableName.PRODUCTS,
        foreignKeyColor.name,
      );
    }

    await queryRunner.dropColumn(TableName.PRODUCTS, ColumnName.SIZE_ID);
    await queryRunner.dropColumn(TableName.PRODUCTS, ColumnName.COLOR_ID);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      TableName.PRODUCTS,
      new TableColumn({
        name: ColumnName.SIZE_ID,
        type: 'int',
        isNullable: false,
      }),
    );
    await queryRunner.addColumn(
      TableName.PRODUCTS,
      new TableColumn({
        name: ColumnName.COLOR_ID,
        type: 'int',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      TableName.PRODUCTS,
      new TableForeignKey({
        columnNames: [ColumnName.SIZE_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.SIZES,
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      TableName.PRODUCTS,
      new TableForeignKey({
        columnNames: [ColumnName.COLOR_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.COLORS,
        onDelete: 'CASCADE',
      }),
    );
  }
}
