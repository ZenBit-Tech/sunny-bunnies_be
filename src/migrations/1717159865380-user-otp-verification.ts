import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserOtpVerification1717159865380 implements MigrationInterface {
  name = 'UserOtpVerification1717159865380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `users` ADD `is_verified` tinyint NOT NULL DEFAULT 0',
    );
    await queryRunner.query(
      'ALTER TABLE `users` ADD `otp_token` varchar(255) NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `users` DROP COLUMN `otp_token`');
    await queryRunner.query('ALTER TABLE `users` DROP COLUMN `is_verified`');
  }
}
