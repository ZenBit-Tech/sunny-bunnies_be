import { Injectable } from '@nestjs/common';
import { TestRepository } from './test.repository';
import { CreateTestEntityDto } from './dto';
import { TestEntity } from './test.entity';

@Injectable()
export class TestService {
  private readonly testRepository: TestRepository;

  constructor(testRepository: TestRepository) {
    this.testRepository = testRepository;
  }

  // Returning all data
  async findAll(): Promise<TestEntity[]> {
    return this.testRepository.findAll();
  }

  // Creates new data entity.
  async createOne(createTestDto: CreateTestEntityDto): Promise<TestEntity> {
    const { value } = createTestDto;
    return this.testRepository.createOne({ value });
  }
}
