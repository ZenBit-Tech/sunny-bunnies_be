import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const TABLE_NAME = 'categories';

const ColumnName = {
  ID: 'id',
  NAME: 'name',
};

export class CategoryEntity1717425420610 implements MigrationInterface {
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
            length: '255',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAME);
  }
}
