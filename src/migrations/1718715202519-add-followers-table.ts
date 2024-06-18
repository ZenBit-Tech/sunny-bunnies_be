import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const TableName = {
  USER_FOLLOWERS: 'user_followers',
  USERS: 'users',
};

const ColumnName = {
  ID: 'id',
  FOLLOWER_ID: 'follower_id',
  USER_ID: 'user_id',
};

export class AddUserFollowers1718715202519 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.USER_FOLLOWERS,
        columns: [
          {
            name: ColumnName.USER_ID,
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: ColumnName.FOLLOWER_ID,
            type: 'uuid',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      TableName.USER_FOLLOWERS,
      new TableForeignKey({
        columnNames: [ColumnName.USER_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.USERS,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.USER_FOLLOWERS,
      new TableForeignKey({
        columnNames: [ColumnName.FOLLOWER_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.USERS,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.USER_FOLLOWERS);
  }
}
