import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades que não estão no DTO (ajuda a rejeitar campos extras)
      forbidNonWhitelisted: true, // gera erro se receber campo que não está no DTO
      transform: true, // transforma payload para instância do DTO automaticamente
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
