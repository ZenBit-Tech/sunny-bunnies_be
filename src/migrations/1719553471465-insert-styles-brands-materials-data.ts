import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTypesBrandsMaterials1719553471465
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(`
        INSERT INTO styles (name)
        VALUES 
          ('Essentials'),
          ('Casual'),
          ('Formal'),
          ('Event Dressing'),
          ('Wedding Guest'),
          ('Streetstyle'),
          ('Statement'),
          ('Vintage'),
          ('Trendy')
      `);

      await queryRunner.query(`
        INSERT INTO brands (name)
        VALUES 
          ('Gucci'),
          ('Chanel'),
          ('Louis Vuitton'),
          ('Prada'),
          ('Versace'),
          ('Coach'),
          ('Kate Spade'),
          ('Michael Kors'),
          ('Longchamp'),
          ('Tory Burch'),
          ('Ralph Lauren'),
          ('Calvin Klein'),
          ('Tommy Hilfiger'),
          ('Levis'),
          ('Gap'),
          ('Nike'),
          ('Adidas'),
          ('Converse'),
          ('Vans'),
          ('Reebok'),
          ('Dolce & Gabbana'),
          ('Fendi'),
          ('Givenchy'),
          ('Armani')
      `);

      await queryRunner.query(`
        INSERT INTO materials (name)
        VALUES 
          ('Leather'),
          ('Fabric'),
          ('Cotton'),
          ('Nylon'),
          ('Polyester'),
          ('Rayon'),
          ('Silk'),
          ('Wool'),
          ('Rubber')
      `);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(`
        DELETE FROM styles WHERE name IN (
          'Essentials', 'Casual', 'Formal', 'Event Dressing', 'Wedding Guest',
          'Streetstyle', 'Statement', 'Vintage', 'Trendy'
        );
      `);

      await queryRunner.query(`
        DELETE FROM brands WHERE name IN (
          'Gucci', 'Chanel', 'Louis Vuitton', 'Prada', 'Versace', 'Coach', 'Kate Spade',
          'Michael Kors', 'Longchamp', 'Tory Burch', 'Ralph Lauren', 'Calvin Klein',
          'Tommy Hilfiger', 'Levis', 'Gap', 'Nike', 'Adidas', 'Converse', 'Vans',
          'Reebok', 'Dolce & Gabbana', 'Fendi', 'Givenchy', 'Armani'
        );
      `);

      await queryRunner.query(`
        DELETE FROM materials WHERE name IN (
          'Leather', 'Fabric', 'Cotton', 'Nylon', 'Polyester', 'Rayon', 'Silk', 'Wool', 'Rubber'
        );
      `);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
