import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertCategoriesData1719551456601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO categories (id, name)
            VALUES 
              (1, 'Clothing'),
              (2, 'Bags'),
              (3, 'Shoes'),
              (4, 'Designers'),
              (5, 'Accessories')
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM categories WHERE name IN ('Clothing', 'Bags', 'Shoes', 'Designers', 'Accessories')
          `);
  }
}
