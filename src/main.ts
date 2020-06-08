import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// import 'dotenv/config';
// const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
