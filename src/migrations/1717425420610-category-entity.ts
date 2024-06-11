import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DataBaseTables } from '../common/enums/index';

export class CategoryEntity1717425420610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DataBaseTables.CATEGORIES,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DataBaseTables.CATEGORIES);
  }
}
