import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const TABLE_NAME = 'users';

const ColumnName = {
  STATUS: 'status',
  DELETED_AT: 'deleted_at',
};

export class AddUserStatusAndDeletedAt1719494696693
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      TABLE_NAME,
      new TableColumn({
        name: ColumnName.STATUS,
        type: 'enum',
        enum: ['active', 'inactive'],
        default: `'active'`,
      }),
    );

    await queryRunner.addColumn(
      TABLE_NAME,
      new TableColumn({
        name: ColumnName.DELETED_AT,
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(TABLE_NAME, ColumnName.DELETED_AT);
    await queryRunner.dropColumn(TABLE_NAME, ColumnName.STATUS);
  }
}
