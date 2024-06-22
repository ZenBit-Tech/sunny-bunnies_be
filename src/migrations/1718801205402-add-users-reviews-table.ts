import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const TableName = {
  USERS: 'users',
  USERS_REVIEWS: 'users_reviews',
};

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  REVIEW: 'review',
  REVIEW_USER_ID: 'review_user_id',
  REVIEWED_USER_ID: 'reviewed_user_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

export class AddUsersReviewsTable1718801205402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.USERS_REVIEWS,
        columns: [
          {
            name: ColumnName.ID,
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: ColumnName.REVIEW,
            type: 'text',
          },
          {
            name: ColumnName.REVIEW_USER_ID,
            type: 'varchar',
          },
          {
            name: ColumnName.REVIEWED_USER_ID,
            type: 'varchar',
          },
          {
            name: ColumnName.CREATED_AT,
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: ColumnName.UPDATED_AT,
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      TableName.USERS_REVIEWS,
      new TableForeignKey({
        columnNames: [ColumnName.REVIEW_USER_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.USERS,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.USERS_REVIEWS,
      new TableForeignKey({
        columnNames: [ColumnName.REVIEWED_USER_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.USERS,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.USERS_REVIEWS);
  }
}
