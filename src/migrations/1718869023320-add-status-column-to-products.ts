import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const TableName = {
  PRODUCTS: 'products',
};

const ColumnName = {
  ACTIVITY_STATUS: 'activity_status',
};

export class AddActivityStatusToProducts1718869023320
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      TableName.PRODUCTS,
      new TableColumn({
        name: ColumnName.ACTIVITY_STATUS,
        type: 'enum',
        enum: ['active', 'inactive', 'published', 'rejected'],
        default: 'published',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      TableName.PRODUCTS,
      ColumnName.ACTIVITY_STATUS,
    );
  }
}
