import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestEntity } from '../../entities';
import { TestService } from './test.service';
import { CreateTestEntityDto } from './dto';

@ApiTags('Test')
@Controller('test')
export class TestController {
  private readonly testService: TestService;

  constructor(testService: TestService) {
    this.testService = testService;
  }

  @Get()
  async findAll(): Promise<TestEntity[]> {
    return this.testService.findAll();
  }

  @Post()
  async createOne(
    @Body() createTestEntityDto: CreateTestEntityDto,
  ): Promise<TestEntity> {
    return this.testService.createOne(createTestEntityDto);
  }
}
