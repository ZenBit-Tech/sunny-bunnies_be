import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class FiltersRepository {
  constructor(private readonly dataSource: DataSource) {}

  async getAllFilters() {
    const [brands, categories, colors, materials, sizes, styles] =
      await Promise.all([
        this.dataSource.query('SELECT * FROM brands'),
        this.dataSource.query('SELECT * FROM categories'),
        this.dataSource.query('SELECT * FROM colors'),
        this.dataSource.query('SELECT * FROM materials'),
        this.dataSource.query('SELECT * FROM sizes'),
        this.dataSource.query('SELECT * FROM styles'),
      ]);

    return { brands, categories, colors, materials, sizes, styles };
  }
}
