import { MigrationInterface, QueryRunner } from 'typeorm';
import { CategoryEntity } from '~/entities';

export class InsertCategoriesData1719606611472 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categoriesRepo = queryRunner.manager.getRepository(CategoryEntity);
    await categoriesRepo.insert([
      { name: 'Clothing' },
      { name: 'Bags' },
      { name: 'Shoes' },
      { name: 'Designers' },
      { name: 'Accessories' },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const categoriesRepo = queryRunner.manager.getRepository(CategoryEntity);

    await categoriesRepo.delete({ name: 'Clothing' });
    await categoriesRepo.delete({ name: 'Bags' });
    await categoriesRepo.delete({ name: 'Shoes' });
    await categoriesRepo.delete({ name: 'Designers' });
    await categoriesRepo.delete({ name: 'Accessories' });
  }
}
