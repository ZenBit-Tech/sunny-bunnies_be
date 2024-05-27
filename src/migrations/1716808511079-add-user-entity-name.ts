import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserEntityName1716808511079 implements MigrationInterface {
  name = 'AddUserEntityName1716808511079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `users` ADD `name` varchar(255) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `users` DROP COLUMN `name`');
  }
}
