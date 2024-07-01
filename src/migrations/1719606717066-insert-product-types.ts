import { MigrationInterface, QueryRunner } from 'typeorm';
import { CategoryEntity, TypeEntity } from '~/entities';

export class InsertCategoriesData1719606717066 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categoriesRepo = queryRunner.manager.getRepository(CategoryEntity);
    const typesRepo = queryRunner.manager.getRepository(TypeEntity);

    const categories = await categoriesRepo.find();
    const categoryMap = new Map(
      categories.map((category) => [category.name, category.id]),
    );

    await typesRepo.insert([
      { name: 'T-shirts', categoryId: categoryMap.get('Clothing') },
      { name: 'Jeans', categoryId: categoryMap.get('Clothing') },
      { name: 'Dresses', categoryId: categoryMap.get('Clothing') },
      { name: 'Shirts and Blouses', categoryId: categoryMap.get('Clothing') },
      { name: 'Tops', categoryId: categoryMap.get('Clothing') },
      { name: 'Pants and Trousers', categoryId: categoryMap.get('Clothing') },
      { name: 'Skirts', categoryId: categoryMap.get('Clothing') },
      { name: 'Sweaters', categoryId: categoryMap.get('Clothing') },
      { name: 'Coats', categoryId: categoryMap.get('Clothing') },
      { name: 'Activewear', categoryId: categoryMap.get('Clothing') },
      { name: 'Sleepwear', categoryId: categoryMap.get('Clothing') },
      { name: 'Underwear', categoryId: categoryMap.get('Clothing') },
      { name: 'Swimwear', categoryId: categoryMap.get('Clothing') },
      { name: 'Sweatshirts', categoryId: categoryMap.get('Clothing') },
      { name: 'Suits', categoryId: categoryMap.get('Clothing') },
      { name: 'Maternity Wear', categoryId: categoryMap.get('Clothing') },
      { name: 'Plus-size Clothing', categoryId: categoryMap.get('Clothing') },
      { name: 'Ethnic Clothing', categoryId: categoryMap.get('Clothing') },
      { name: 'Handbags', categoryId: categoryMap.get('Bags') },
      { name: 'Purses', categoryId: categoryMap.get('Bags') },
      { name: 'Wallets', categoryId: categoryMap.get('Bags') },
      { name: 'Clutches', categoryId: categoryMap.get('Bags') },
      { name: 'Crossbody Bags', categoryId: categoryMap.get('Bags') },
      { name: 'Sneakers', categoryId: categoryMap.get('Shoes') },
      { name: 'Boots', categoryId: categoryMap.get('Shoes') },
      { name: 'Sandals', categoryId: categoryMap.get('Shoes') },
      { name: 'Heels', categoryId: categoryMap.get('Shoes') },
      { name: 'Loafers', categoryId: categoryMap.get('Shoes') },
      { name: 'Moccasins', categoryId: categoryMap.get('Shoes') },
      { name: 'Slippers', categoryId: categoryMap.get('Shoes') },
      { name: 'Flip-flops', categoryId: categoryMap.get('Shoes') },
      { name: 'High heels', categoryId: categoryMap.get('Shoes') },
      { name: 'T-shirts', categoryId: categoryMap.get('Designers') },
      { name: 'Jeans', categoryId: categoryMap.get('Designers') },
      { name: 'Dresses', categoryId: categoryMap.get('Designers') },
      { name: 'Shirts and Blouses', categoryId: categoryMap.get('Designers') },
      { name: 'Tops', categoryId: categoryMap.get('Designers') },
      { name: 'Pants and Trousers', categoryId: categoryMap.get('Designers') },
      { name: 'Skirts', categoryId: categoryMap.get('Designers') },
      { name: 'Sweaters', categoryId: categoryMap.get('Designers') },
      { name: 'Coats', categoryId: categoryMap.get('Designers') },
      { name: 'Hats', categoryId: categoryMap.get('Accessories') },
      { name: 'Belts', categoryId: categoryMap.get('Accessories') },
      { name: 'Jewelry', categoryId: categoryMap.get('Accessories') },
      { name: 'Watches', categoryId: categoryMap.get('Accessories') },
      { name: 'Sunglasses', categoryId: categoryMap.get('Accessories') },
      { name: 'Gloves', categoryId: categoryMap.get('Accessories') },
      { name: 'Ties', categoryId: categoryMap.get('Accessories') },
      { name: 'Brooches', categoryId: categoryMap.get('Accessories') },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const typesRepo = queryRunner.manager.getRepository(TypeEntity);

    const typeNames = [
      'T-shirts',
      'Jeans',
      'Dresses',
      'Shirts and Blouses',
      'Tops',
      'Pants and Trousers',
      'Skirts',
      'Sweaters',
      'Coats',
      'Activewear',
      'Sleepwear',
      'Underwear',
      'Swimwear',
      'Sweatshirts',
      'Suits',
      'Maternity Wear',
      'Plus-size Clothing',
      'Ethnic Clothing',
      'Handbags',
      'Purses',
      'Wallets',
      'Clutches',
      'Crossbody Bags',
      'Sneakers',
      'Boots',
      'Sandals',
      'Heels',
      'Loafers',
      'Moccasins',
      'Slippers',
      'Flip-flops',
      'High heels',
      'T-shirts',
      'Jeans',
      'Dresses',
      'Shirts and Blouses',
      'Tops',
      'Pants and Trousers',
      'Skirts',
      'Sweaters',
      'Coats',
      'Hats',
      'Belts',
      'Jewelry',
      'Watches',
      'Sunglasses',
      'Gloves',
      'Ties',
      'Brooches',
    ];

    const typesToDelete = await typesRepo
      .createQueryBuilder('type')
      .where('type.name IN (:...typeNames)', { typeNames })
      .getMany();

    await typesRepo.remove(typesToDelete);
  }
}
