import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const TableName = {
  USER_FOLLOWERS: 'user_followers',
  USERS: 'users',
  USER_RATINGS: 'users_rating',
};

const ColumnName = {
  ID: 'id',
  FOLLOWER_ID: 'follower_id',
  USER_ID: 'user_id',
  RATING: 'rating',
  RATED_USER_ID: 'rated_user_id',
  RATING_USER_ID: 'rating_user_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

export class AddUserFollowers1718715202519 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.USER_FOLLOWERS,
        columns: [
          {
            name: ColumnName.USER_ID,
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: ColumnName.FOLLOWER_ID,
            type: 'varchar',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: TableName.USER_RATINGS,
        columns: [
          {
            name: ColumnName.ID,
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: ColumnName.RATING,
            type: 'int',
            default: 0,
          },
          {
            name: ColumnName.RATED_USER_ID,
            type: 'varchar',
          },
          {
            name: ColumnName.RATING_USER_ID,
            type: 'varchar',
          },
          {
            name: ColumnName.CREATED_AT,
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: ColumnName.UPDATED_AT,
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
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

    await queryRunner.createForeignKey(
      TableName.USER_RATINGS,
      new TableForeignKey({
        columnNames: [ColumnName.RATED_USER_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.USERS,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.USER_RATINGS,
      new TableForeignKey({
        columnNames: [ColumnName.RATING_USER_ID],
        referencedColumnNames: [ColumnName.ID],
        referencedTableName: TableName.USERS,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableUserFollowers = await queryRunner.getTable(
      TableName.USER_FOLLOWERS,
    );
    const tableUserRatings = await queryRunner.getTable(TableName.USER_RATINGS);

    const foreignKeyUserFollowersUser = tableUserFollowers.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(ColumnName.USER_ID) !== -1,
    );

    const foreignKeyUserFollowersFollower = tableUserFollowers.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(ColumnName.FOLLOWER_ID) !== -1,
    );

    const foreignKeyUserRatingsRatedUser = tableUserRatings.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(ColumnName.RATED_USER_ID) !== -1,
    );

    const foreignKeyUserRatingsRatingUser = tableUserRatings.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(ColumnName.RATING_USER_ID) !== -1,
    );

    if (foreignKeyUserFollowersUser) {
      await queryRunner.dropForeignKey(
        TableName.USER_FOLLOWERS,
        foreignKeyUserFollowersUser,
      );
    }

    if (foreignKeyUserFollowersFollower) {
      await queryRunner.dropForeignKey(
        TableName.USER_FOLLOWERS,
        foreignKeyUserFollowersFollower,
      );
    }

    if (foreignKeyUserRatingsRatedUser) {
      await queryRunner.dropForeignKey(
        TableName.USER_RATINGS,
        foreignKeyUserRatingsRatedUser,
      );
    }

    if (foreignKeyUserRatingsRatingUser) {
      await queryRunner.dropForeignKey(
        TableName.USER_RATINGS,
        foreignKeyUserRatingsRatingUser,
      );
    }

    await queryRunner.dropTable(TableName.USER_FOLLOWERS);
    await queryRunner.dropTable(TableName.USER_RATINGS);
  }
}
