import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertSizesCategories1719839607376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sizeCategoryData = [
      { sizeId: 1, categoryIds: [1, 4] },
      { sizeId: 2, categoryIds: [1, 4] },
      { sizeId: 3, categoryIds: [1, 4] },
      { sizeId: 4, categoryIds: [1, 4] },
      { sizeId: 5, categoryIds: [1, 4] },
      { sizeId: 6, categoryIds: [1, 4] },
      { sizeId: 7, categoryIds: [1, 4] },
      { sizeId: 8, categoryIds: [1, 4] },
      { sizeId: 9, categoryIds: [1, 4] },
      { sizeId: 10, categoryIds: [1, 4] },
      { sizeId: 11, categoryIds: [3] },
      { sizeId: 12, categoryIds: [3] },
      { sizeId: 13, categoryIds: [3] },
      { sizeId: 14, categoryIds: [3] },
      { sizeId: 15, categoryIds: [3] },
      { sizeId: 16, categoryIds: [3] },
      { sizeId: 17, categoryIds: [3] },
      { sizeId: 18, categoryIds: [3] },
      { sizeId: 19, categoryIds: [3] },
      { sizeId: 20, categoryIds: [3] },
      { sizeId: 21, categoryIds: [3] },
      { sizeId: 22, categoryIds: [3] },
      { sizeId: 23, categoryIds: [3] },
      { sizeId: 24, categoryIds: [3] },
      { sizeId: 25, categoryIds: [3] },
      { sizeId: 26, categoryIds: [3] },
      { sizeId: 27, categoryIds: [3] },
      { sizeId: 28, categoryIds: [3] },
      { sizeId: 29, categoryIds: [2, 5] },
    ];

    const sizeCategoryEntities = sizeCategoryData
      .map(({ sizeId, categoryIds }) =>
        categoryIds.map((categoryId) => ({
          sizeId,
          categoryId,
        })),
      )
      .flat();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('sizes_categories')
      .values(sizeCategoryEntities)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM sizes_categories`);
  }
}
