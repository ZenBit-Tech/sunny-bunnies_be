import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Cat } from './cat.entity';

@Injectable()
export class CatsRepository extends Repository<Cat> {
  constructor(dataSource: DataSource) {
    super(Cat, dataSource.createEntityManager());
  }

  async getCats() {
    return this.find();
  }

  async createCat({ name }: { name: string }) {
    const cat = this.create({
      name,
    });

    await this.save(cat);
    return cat;
  }
}
