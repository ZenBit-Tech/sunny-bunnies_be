import 'reflect-metadata';

import { dataSource } from '../common/configs/typeorm-data-source.config';
import { CombinedSeeder } from './combined-seeder';

async function runSeeder() {
  await dataSource.initialize();

  const seeder = new CombinedSeeder();
  await seeder.run(dataSource);

  await dataSource.destroy();
}

runSeeder();
