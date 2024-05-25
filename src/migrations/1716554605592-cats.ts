import { MigrationInterface, QueryRunner } from 'typeorm';

export class Cats1716554605592 implements MigrationInterface {
  name = 'Cats1716554605592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `cat` (`id` int NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `cat`');
  }
}
