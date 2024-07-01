import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSizesCategories1719839492084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sizes_categories',
        columns: [
          {
            name: 'sizeId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'categoryId',
            type: 'int',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['sizeId'],
            referencedTableName: 'sizes',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['categoryId'],
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sizes_categories');
  }
}
