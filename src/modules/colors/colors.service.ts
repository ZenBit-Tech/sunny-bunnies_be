import { Injectable } from '@nestjs/common';

import { ColorEntity } from '~/entities';
import { ColorsRepository } from './colors.repository';

@Injectable()
export class ColorsService {
  private readonly colorsRepository: ColorsRepository;

  constructor(colorsRepository: ColorsRepository) {
    this.colorsRepository = colorsRepository;
  }

  async findAll(): Promise<ColorEntity[]> {
    return this.colorsRepository.findAll();
  }
}
