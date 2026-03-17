import { migrate } from 'database/content/typeorm/typeorm-migration-helper';
import * as path from 'path';
import * as tsConfigPaths from 'tsconfig-paths';

import tsConfig from '../tsconfig.json';

const baseUrl = path.resolve(__dirname, '..');

tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});

export default async function globalSetup() {
  console.log('🔧 Running E2E test setup...');

  try {
    console.info('📦 Running TypeORM migrations...');

    await migrate();

    console.info('✅ TypeORM migrations completed successfully');
  } catch (error) {
    console.error('❌ Failed to run migrations:', error);

    throw error;
  }
}
