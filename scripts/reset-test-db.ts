import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { createPostgresDatabase } from 'typeorm-extension';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.test', override: true });

async function resetTestDatabase() {
  console.log('🗑️  Resetting test database...');

  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'fakeflix_test',
    synchronize: false,
  });

  try {
    console.log('📦 Creating test database if not exists...');
    await createPostgresDatabase({
      ifNotExist: true,
      options: {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT || '5432'),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
      },
    });

    await dataSource.initialize();

    console.log('🗑️  Dropping all TypeORM tables in public schema...');
    await dataSource.query(`
      DROP SCHEMA IF EXISTS public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
    `);

    console.log('🗑️  Resetting Prisma schemas...');
    await dataSource.query(`DROP SCHEMA IF EXISTS identity CASCADE;`);
    await dataSource.query(`DROP SCHEMA IF EXISTS test CASCADE;`);
    await dataSource.query(`CREATE SCHEMA IF NOT EXISTS identity;`);
    await dataSource.query(`CREATE SCHEMA IF NOT EXISTS test;`);

    console.log('✅ Test database reset complete!');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Run Prisma migrations: npm run identity:db:migrate');
    console.log('  2. Run TypeORM migrations: npm run content:db:migrate');
    console.log('  3. Run tests: npm run test:e2e');
  } catch (error) {
    console.error('❌ Error resetting test database:', error);

    throw error;
  } finally {
    if (dataSource.isInitialized) await dataSource.destroy();
  }
}

resetTestDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
