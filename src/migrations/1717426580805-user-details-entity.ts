import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreateUserProfilesTable1716809999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_profiles',
        columns: [
          {
            name: 'profile_id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['buyer', 'vendor'],
          },
          {
            name: 'phone_number',
            type: 'varchar',
          },
          {
            name: 'profile_photo',
            type: 'varchar',
          },
          {
            name: 'address_line_1',
            type: 'varchar',
          },
          {
            name: 'address_line_2',
            type: 'varchar',
          },
          {
            name: 'country',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'clothes_size',
            type: 'varchar',
          },
          {
            name: 'jeans_size',
            type: 'varchar',
          },
          {
            name: 'shoe_size',
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
            name: 'registration_completed',
            type: 'boolean',
            default: false,
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
            name: 'FK_user_id',
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
    await queryRunner.dropTable('user_profiles');
  }
}

export { CreateUserProfilesTable1716809999999 };
