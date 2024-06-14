import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { DataBaseTables } from '../common/enums/index';

export class CreateVariantsTable1717426580704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DataBaseTables.PRODUCT_VARIANTS,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'product_id',
            type: 'int',
          },
          {
            name: 'size_id',
            type: 'int',
          },
          {
            name: 'color_id',
            type: 'int',
          },
          {
            name: 'quantity',
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
      DataBaseTables.PRODUCT_VARIANTS,
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: DataBaseTables.PRODUCTS,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      DataBaseTables.PRODUCT_VARIANTS,
      new TableForeignKey({
        columnNames: ['size_id'],
        referencedColumnNames: ['id'],
        referencedTableName: DataBaseTables.SIZES,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      DataBaseTables.PRODUCT_VARIANTS,
      new TableForeignKey({
        columnNames: ['color_id'],
        referencedColumnNames: ['id'],
        referencedTableName: DataBaseTables.COLORS,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(DataBaseTables.PRODUCT_VARIANTS);

    if (table) {
      const foreignKeys = table.foreignKeys.filter(
        (fk) =>
          fk.columnNames.indexOf('product_id') !== -1 ||
          fk.columnNames.indexOf('size_id') !== -1 ||
          fk.columnNames.indexOf('color_id') !== -1,
      );
      const dropForeignKeyPromises = foreignKeys.map((foreignKey) =>
        queryRunner.dropForeignKey(DataBaseTables.PRODUCT_VARIANTS, foreignKey),
      );

      await Promise.all(dropForeignKeyPromises);
      await queryRunner.dropTable(DataBaseTables.PRODUCT_VARIANTS);
    }
  }
}
