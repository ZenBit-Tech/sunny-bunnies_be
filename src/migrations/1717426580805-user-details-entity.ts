import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreateUserProfilesTable1716809999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_profiles',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            length: '36',
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['buyer', 'vendor', 'admin'],
            isNullable: true,
          },
          {
            name: 'phone_number',
            type: 'varchar',
          },
          {
            name: 'profile_photo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address_line_one',
            type: 'varchar',
          },
          {
            name: 'address_line_two',
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
            name: 'is_registration_completed',
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
