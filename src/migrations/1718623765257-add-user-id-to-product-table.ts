import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const TableName = {
  PRODUCTS: 'products',
  USERS: 'users',
};

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
};

export class AddUserIdToProducts1718623765257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      TableName.PRODUCTS,
      new TableColumn({
        name: ColumnName.USER_ID,
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      TableName.PRODUCTS,
      new TableForeignKey({
        columnNames: [ColumnName.USER_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.USERS,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(TableName.PRODUCTS, ColumnName.USER_ID);
  }
}
