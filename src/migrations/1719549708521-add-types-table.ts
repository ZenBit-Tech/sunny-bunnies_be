import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const TableName = {
  CATEGORIES: 'categories',
  TYPES: 'types',
};

const ColumnName = {
  ID: 'id',
  CATEGORY_ID: 'category_id',
  NAME: 'name',
};

export class AddTypesTable1719549708521 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.TYPES,
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
          {
            name: ColumnName.CATEGORY_ID,
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      TableName.TYPES,
      new TableForeignKey({
        columnNames: [ColumnName.CATEGORY_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.CATEGORIES,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.TYPES);
  }
}
