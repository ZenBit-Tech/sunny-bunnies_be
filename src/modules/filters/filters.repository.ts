import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  BrandEntity,
  CategoryEntity,
  ColorEntity,
  MaterialEntity,
  SizeEntity,
  StyleEntity,
} from '../../entities';

import { FiltersResponse } from './types/filters-response.type';

@Injectable()
export class FiltersRepository {
  constructor(private readonly dataSource: DataSource) {}

  private getRepository<Entity>(entity: new () => Entity) {
    return this.dataSource.getRepository(entity);
  }

  async getAllFilters(): Promise<FiltersResponse> {
    const [brands, categories, colors, materials, sizes, styles] =
      await Promise.all([
        this.getRepository(BrandEntity).find(),
        this.getRepository(CategoryEntity).find(),
        this.getRepository(ColorEntity).find(),
        this.getRepository(MaterialEntity).find(),
        this.getRepository(SizeEntity).find(),
        this.getRepository(StyleEntity).find(),
      ]);

    return { brands, categories, colors, materials, sizes, styles };
  }
}
