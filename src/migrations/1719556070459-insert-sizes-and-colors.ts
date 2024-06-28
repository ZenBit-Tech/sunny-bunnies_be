import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertSizesAndColors1719556070459 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO colors (name)
            VALUES 
              ('Red'),
              ('Orange'),
              ('Yellow'),
              ('Green'),
              ('Blue'),
              ('Indigo'),
              ('Violet'),
              ('Black')
          `);

    await queryRunner.query(`
            INSERT INTO sizes (name)
            VALUES 
              ('4XS'),
              ('3XS'),
              ('XXS'),
              ('XS'),
              ('S'),
              ('M'),
              ('L'),
              ('XL'),
              ('XXL'),
              ('XXXL'),
              ('3.0'),
              ('3.5'),
              ('4.0'),
              ('4.5'),
              ('5.0'),
              ('5.5'),
              ('6.0'),
              ('6.5'),
              ('7.0'),
              ('7.5'),
              ('8.0'),
              ('8.5'),
              ('9.0'),
              ('9.5'),
              ('10.0'),
              ('10.5'),
              ('11.0'),
              ('11.5')
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM sizes WHERE name IN (
              '4XS', '3XS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL',
              '3.0', '3.5', '4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5',
              '8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '11.5'
            )
          `);

    await queryRunner.query(`
            DELETE FROM colors WHERE name IN (
              'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet', 'Black'
            )
          `);
  }
}
