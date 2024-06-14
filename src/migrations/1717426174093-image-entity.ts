import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { DataBaseTables } from '../common/enums/index';

export class ProductImagesEntity1717425420610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DataBaseTables.PRODUCT_IMAGES,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'url',
            type: 'text',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'productId',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      DataBaseTables.PRODUCT_IMAGES,
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: DataBaseTables.PRODUCTS,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(DataBaseTables.PRODUCT_IMAGES);
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('productId') !== -1,
    );

    await queryRunner.dropForeignKey(DataBaseTables.PRODUCT_IMAGES, foreignKey);
    await queryRunner.dropTable(DataBaseTables.PRODUCT_IMAGES);
  }
}
