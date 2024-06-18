import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreateUserCardTable1716810000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_card',
        columns: [
          {
            name: 'card_id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'card_number',
            type: 'varchar',
          },
          {
            name: 'expire_date',
            type: 'varchar',
          },
          {
            name: 'cvv_code',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          {
            name: 'IDX_user_id',
            columnNames: ['user_id'],
            isUnique: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_user_id_card',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_card');
  }
}

export { CreateUserCardTable1716810000000 };
