import { MigrationInterface, QueryRunner } from 'typeorm';
import { ColorEntity, SizeEntity } from '~/entities';

export class InsertSizesAndColors1719606310185 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const colorsRepo = queryRunner.manager.getRepository(ColorEntity);
    await colorsRepo.insert([
      { name: 'Red' },
      { name: 'Orange' },
      { name: 'Yellow' },
      { name: 'Green' },
      { name: 'Blue' },
      { name: 'Indigo' },
      { name: 'Violet' },
      { name: 'Black' },
    ]);

    const sizesRepo = queryRunner.manager.getRepository(SizeEntity);
    await sizesRepo.insert([
      { name: '4XS' },
      { name: '3XS' },
      { name: 'XXS' },
      { name: 'XS' },
      { name: 'S' },
      { name: 'M' },
      { name: 'L' },
      { name: 'XL' },
      { name: 'XXL' },
      { name: 'XXXL' },
      { name: '3.0' },
      { name: '3.5' },
      { name: '4.0' },
      { name: '4.5' },
      { name: '5.0' },
      { name: '5.5' },
      { name: '6.0' },
      { name: '6.5' },
      { name: '7.0' },
      { name: '7.5' },
      { name: '8.0' },
      { name: '8.5' },
      { name: '9.0' },
      { name: '9.5' },
      { name: '10.0' },
      { name: '10.5' },
      { name: '11.0' },
      { name: '11.5' },
      { name: 'One Size' },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const colorsRepo = queryRunner.manager.getRepository(ColorEntity);
    await colorsRepo.delete({ name: 'Red' });
    await colorsRepo.delete({ name: 'Orange' });
    await colorsRepo.delete({ name: 'Yellow' });
    await colorsRepo.delete({ name: 'Green' });
    await colorsRepo.delete({ name: 'Blue' });
    await colorsRepo.delete({ name: 'Indigo' });
    await colorsRepo.delete({ name: 'Violet' });
    await colorsRepo.delete({ name: 'Black' });

    const sizesRepo = queryRunner.manager.getRepository(SizeEntity);
    await sizesRepo.delete({ name: '4XS' });
    await sizesRepo.delete({ name: '3XS' });
    await sizesRepo.delete({ name: 'XXS' });
    await sizesRepo.delete({ name: 'XS' });
    await sizesRepo.delete({ name: 'S' });
    await sizesRepo.delete({ name: 'M' });
    await sizesRepo.delete({ name: 'L' });
    await sizesRepo.delete({ name: 'XL' });
    await sizesRepo.delete({ name: 'XXL' });
    await sizesRepo.delete({ name: 'XXXL' });
    await sizesRepo.delete({ name: '3.0' });
    await sizesRepo.delete({ name: '3.5' });
    await sizesRepo.delete({ name: '4.0' });
    await sizesRepo.delete({ name: '4.5' });
    await sizesRepo.delete({ name: '5.0' });
    await sizesRepo.delete({ name: '5.5' });
    await sizesRepo.delete({ name: '6.0' });
    await sizesRepo.delete({ name: '6.5' });
    await sizesRepo.delete({ name: '7.0' });
    await sizesRepo.delete({ name: '7.5' });
    await sizesRepo.delete({ name: '8.0' });
    await sizesRepo.delete({ name: '8.5' });
    await sizesRepo.delete({ name: '9.0' });
    await sizesRepo.delete({ name: '9.5' });
    await sizesRepo.delete({ name: '10.0' });
    await sizesRepo.delete({ name: '10.5' });
    await sizesRepo.delete({ name: '11.0' });
    await sizesRepo.delete({ name: '11.5' });
    await sizesRepo.delete({ name: 'One Size' });
  }
}
