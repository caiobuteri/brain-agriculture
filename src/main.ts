import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades que não estão no DTO (ajuda a rejeitar campos extras)
      forbidNonWhitelisted: true, // gera erro se receber campo que não está no DTO
      transform: true, // transforma payload para instância do DTO automaticamente
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Brain Agriculture API')
    .setDescription(
      'API responsável pelo gerenciamento de dados agrícolas, incluindo produtores, fazendas, safras e culturas. ' +
        'Permite o cadastro, consulta e exclusão lógica de registros, além de fornecer métricas agregadas por meio do módulo de dashboard. ' +
        'Ideal para sistemas de apoio à decisão no setor agro com foco em rastreabilidade, organização e análise de informações.',
    )
    .setVersion('1.0')
    .addTag('brain-agriculture')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
