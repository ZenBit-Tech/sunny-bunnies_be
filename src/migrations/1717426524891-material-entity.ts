import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const TABLE_NAME = 'materials';

const ColumnName = {
  ID: 'id',
  NAME: 'name',
};

export class MaterialEntity1717426524891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAME,
        columns: [
          {
            name: ColumnName.ID,
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: ColumnName.NAME,
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAME);
  }
}
