import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TestEntity } from '../../entities';

@Injectable()
export class TestRepository extends Repository<TestEntity> {
  constructor(dataSource: DataSource) {
    super(TestEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<TestEntity[]> {
    return this.find();
  }

  async createOne({ value }: { value: string }): Promise<TestEntity> {
    const testEntity = this.create({
      value,
    });

    await this.save(testEntity);
    return testEntity;
  }
}
