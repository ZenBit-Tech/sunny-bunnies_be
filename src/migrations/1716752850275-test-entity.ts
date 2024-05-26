import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestEntity1716752850275 implements MigrationInterface {
  name = 'TestEntity1716752850275';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `test` (`id` int NOT NULL AUTO_INCREMENT, `value` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `test`');
  }
}
