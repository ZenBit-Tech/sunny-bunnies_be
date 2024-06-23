import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const TableName = 'tokens';

const ColumnName = {
  ID: 'id',
  TOKEN: 'token',
};

export class TokenTable1719155605670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName,
        columns: [
          {
            name: ColumnName.ID,
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: ColumnName.TOKEN,
            type: 'text',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName);
  }
}
