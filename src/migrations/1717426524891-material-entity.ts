import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DataBaseTables } from '../common/enums/index';

export class MaterialEntity1717426524891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DataBaseTables.MATERIALS,
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
    await queryRunner.dropTable(DataBaseTables.MATERIALS);
  }
}
