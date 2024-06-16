import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const TABLE_NAME = 'product_images';

const ColumnName = {
  ID: 'id',
  URL: 'url',
  DESCRIPTION: 'description',
  CREATED_AT: 'created_at',
};

export class ProductImagesEntity1717425420610 implements MigrationInterface {
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
            name: ColumnName.URL,
            type: 'text',
          },
          {
            name: ColumnName.DESCRIPTION,
            type: 'text',
            isNullable: true,
          },
          {
            name: ColumnName.CREATED_AT,
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAME);
  }
}
