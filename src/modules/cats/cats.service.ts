import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  private readonly catsRepository: CatsRepository;

  constructor(catsRepository: CatsRepository) {
    this.catsRepository = catsRepository;
  }

  async getCats() {
    return this.catsRepository.getCats();
  }

  async createCat(dto: CreateCatDto) {
    const { name } = dto;

    return this.catsRepository.createCat({ name });
  }
}
