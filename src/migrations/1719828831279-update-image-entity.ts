import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const TableName = 'product_images';

const ColumnName = {
  DESCRIPTION: 'description',
  IS_PRIMARY: 'is_primary',
};

export class UpdateProductImagesTable1719828831279
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(TableName, ColumnName.DESCRIPTION);

    await queryRunner.addColumn(
      TableName,
      new TableColumn({
        name: ColumnName.IS_PRIMARY,
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(TableName, ColumnName.IS_PRIMARY);

    await queryRunner.addColumn(
      TableName,
      new TableColumn({
        name: ColumnName.DESCRIPTION,
        type: 'text',
        isNullable: true,
      }),
    );
  }
}
