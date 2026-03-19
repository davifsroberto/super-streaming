import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function ensureTestDatabase() {
  console.info('🔧 Ensuring test database is ready...\n');

  try {
    console.info('📦 Running TypeORM migrations...');
    const { stdout, stderr } = await execAsync(
      'npm run content:db:migrate --silent',
    );

    if (stdout) console.info(stdout);
    if (stderr && !stderr.includes('LOG')) console.error(stderr);

    console.info('✅ Database is ready for E2E tests\n');
  } catch (error: any) {
    console.info(
      '⚠️  Migrations failed. This might mean the database needs to be reset.',
    );
    console.info('   Run: npm run test:e2e:reset\n');

    throw error;
  }
}

if (require.main === module) {
  ensureTestDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('❌ Failed to ensure test database:', error.message);

      process.exit(1);
    });
}

export default ensureTestDatabase;
