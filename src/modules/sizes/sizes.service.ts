import { Injectable } from '@nestjs/common';

import { SizeEntity } from '~/entities';
import { SizesRepository } from './sizes.repository';

@Injectable()
export class SizesService {
  private readonly sizeRepository: SizesRepository;

  constructor(sizesRepository: SizesRepository) {
    this.sizeRepository = sizesRepository;
  }

  async findForCategory(category: string): Promise<SizeEntity[]> {
    return this.sizeRepository.find({ where: { sizeFor: category } });
  }
}
