import { Injectable } from '@nestjs/common';
import { FiltersRepository } from './filters.repository';
import { FiltersResponse } from './types/filters-response.type';

@Injectable()
export class FiltersService {
  constructor(private readonly filtersRepository: FiltersRepository) {}

  async getAllFilters(): Promise<FiltersResponse> {
    return this.filtersRepository.getAllFilters();
  }
}
