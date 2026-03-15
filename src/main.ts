import { NestFactory } from '@nestjs/core';

import { ContentModule } from './module/content/content.module';

async function bootstrap() {
  const app = await NestFactory.create(ContentModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
