import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1720609607327 implements MigrationInterface {
  name = 'Migrations1720609607327';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` DROP FOREIGN KEY \`FK_320cb7895bea73c3b2e0faf122f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` DROP FOREIGN KEY \`FK_95fda1b56ba062bb0cb2a31ffd9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` DROP COLUMN \`rated_user_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` DROP COLUMN \`rating_user_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_card\` DROP COLUMN \`card_number\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_card\` DROP COLUMN \`expire_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_card\` DROP COLUMN \`cvv_code\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` ADD \`ratedUserId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` ADD \`ratingUserId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_card\` ADD \`cardNumber\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_card\` ADD \`expireDate\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_card\` ADD \`cvvCode\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` ADD CONSTRAINT \`FK_ea48a1c77892149d972a933e48f\` FOREIGN KEY (\`ratedUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` ADD CONSTRAINT \`FK_1efab1ea60d67fca6cb8eed3719\` FOREIGN KEY (\`ratingUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` DROP FOREIGN KEY \`FK_1efab1ea60d67fca6cb8eed3719\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` DROP FOREIGN KEY \`FK_ea48a1c77892149d972a933e48f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_card\` DROP COLUMN \`cvvCode\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_card\` DROP COLUMN \`expireDate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_card\` DROP COLUMN \`cardNumber\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` DROP COLUMN \`ratingUserId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` DROP COLUMN \`ratedUserId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_card\` ADD \`cvv_code\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_card\` ADD \`expire_date\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_card\` ADD \`card_number\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` ADD \`rating_user_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` ADD \`rated_user_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` ADD CONSTRAINT \`FK_95fda1b56ba062bb0cb2a31ffd9\` FOREIGN KEY (\`rated_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_rating\` ADD CONSTRAINT \`FK_320cb7895bea73c3b2e0faf122f\` FOREIGN KEY (\`rating_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
