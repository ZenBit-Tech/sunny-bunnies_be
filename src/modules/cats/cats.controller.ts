import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  private readonly catsService: CatsService;

  constructor(catsService: CatsService) {
    this.catsService = catsService;
  }

  @Get()
  async findAll() {
    return this.catsService.getCats();
  }

  @Post()
  async createOne(@Body() dto: CreateCatDto) {
    return this.catsService.createCat(dto);
  }
}
