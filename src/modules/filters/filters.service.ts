import { Injectable } from '@nestjs/common';
import { FiltersRepository } from './filters.repository';

@Injectable()
export class FiltersService {
  constructor(private readonly filtersRepository: FiltersRepository) {}

  async getAllFilters() {
    return this.filtersRepository.getAllFilters();
  }
}
