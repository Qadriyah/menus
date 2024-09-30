import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const adapter = new ExpressAdapter();
  adapter.set('trust proxy', 1);
  const app = await NestFactory.create(AppModule, adapter);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('/api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.enableCors();
  await app.listen(configService.get('PORT'));
}
bootstrap();
