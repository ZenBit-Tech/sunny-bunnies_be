import { MigrationInterface, QueryRunner } from 'typeorm';
import { StyleEntity, BrandEntity, MaterialEntity } from '~/entities';

export class InsertTypesBrandsMaterials1719606451063
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const stylesRepo = queryRunner.manager.getRepository(StyleEntity);
    await stylesRepo.insert([
      { name: 'Essentials' },
      { name: 'Casual' },
      { name: 'Formal' },
      { name: 'Event Dressing' },
      { name: 'Wedding Guest' },
      { name: 'Streetstyle' },
      { name: 'Statement' },
      { name: 'Vintage' },
      { name: 'Trendy' },
    ]);

    const brandsRepo = queryRunner.manager.getRepository(BrandEntity);
    await brandsRepo.insert([
      { name: 'Gucci' },
      { name: 'Chanel' },
      { name: 'Louis Vuitton' },
      { name: 'Prada' },
      { name: 'Versace' },
      { name: 'Coach' },
      { name: 'Kate Spade' },
      { name: 'Michael Kors' },
      { name: 'Longchamp' },
      { name: 'Tory Burch' },
      { name: 'Ralph Lauren' },
      { name: 'Calvin Klein' },
      { name: 'Tommy Hilfiger' },
      { name: 'Levis' },
      { name: 'Gap' },
      { name: 'Nike' },
      { name: 'Adidas' },
      { name: 'Converse' },
      { name: 'Vans' },
      { name: 'Reebok' },
      { name: 'Dolce & Gabbana' },
      { name: 'Fendi' },
      { name: 'Givenchy' },
      { name: 'Armani' },
    ]);

    const materialsRepo = queryRunner.manager.getRepository(MaterialEntity);
    await materialsRepo.insert([
      { name: 'Leather' },
      { name: 'Fabric' },
      { name: 'Cotton' },
      { name: 'Nylon' },
      { name: 'Polyester' },
      { name: 'Rayon' },
      { name: 'Silk' },
      { name: 'Wool' },
      { name: 'Rubber' },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const stylesRepo = queryRunner.manager.getRepository(StyleEntity);
    await stylesRepo.delete({ name: 'Essentials' });
    await stylesRepo.delete({ name: 'Casual' });
    await stylesRepo.delete({ name: 'Formal' });
    await stylesRepo.delete({ name: 'Event Dressing' });
    await stylesRepo.delete({ name: 'Wedding Guest' });
    await stylesRepo.delete({ name: 'Streetstyle' });
    await stylesRepo.delete({ name: 'Statement' });
    await stylesRepo.delete({ name: 'Vintage' });
    await stylesRepo.delete({ name: 'Trendy' });

    const brandsRepo = queryRunner.manager.getRepository(BrandEntity);
    await brandsRepo.delete({ name: 'Gucci' });
    await brandsRepo.delete({ name: 'Chanel' });
    await brandsRepo.delete({ name: 'Louis Vuitton' });
    await brandsRepo.delete({ name: 'Prada' });
    await brandsRepo.delete({ name: 'Versace' });
    await brandsRepo.delete({ name: 'Coach' });
    await brandsRepo.delete({ name: 'Kate Spade' });
    await brandsRepo.delete({ name: 'Michael Kors' });
    await brandsRepo.delete({ name: 'Longchamp' });
    await brandsRepo.delete({ name: 'Tory Burch' });
    await brandsRepo.delete({ name: 'Ralph Lauren' });
    await brandsRepo.delete({ name: 'Calvin Klein' });
    await brandsRepo.delete({ name: 'Tommy Hilfiger' });
    await brandsRepo.delete({ name: 'Levis' });
    await brandsRepo.delete({ name: 'Gap' });
    await brandsRepo.delete({ name: 'Nike' });
    await brandsRepo.delete({ name: 'Adidas' });
    await brandsRepo.delete({ name: 'Converse' });
    await brandsRepo.delete({ name: 'Vans' });
    await brandsRepo.delete({ name: 'Reebok' });
    await brandsRepo.delete({ name: 'Dolce & Gabbana' });
    await brandsRepo.delete({ name: 'Fendi' });
    await brandsRepo.delete({ name: 'Givenchy' });
    await brandsRepo.delete({ name: 'Armani' });

    const materialsRepo = queryRunner.manager.getRepository(MaterialEntity);
    await materialsRepo.delete({ name: 'Leather' });
    await materialsRepo.delete({ name: 'Fabric' });
    await materialsRepo.delete({ name: 'Cotton' });
    await materialsRepo.delete({ name: 'Nylon' });
    await materialsRepo.delete({ name: 'Polyester' });
    await materialsRepo.delete({ name: 'Rayon' });
    await materialsRepo.delete({ name: 'Silk' });
    await materialsRepo.delete({ name: 'Wool' });
    await materialsRepo.delete({ name: 'Rubber' });
  }
}
