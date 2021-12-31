import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Email Service')
    .setDescription('A Transactional Email Service')
    .setVersion('1.0')
    .build();

  /**
   * Initilize OpenApi swagger docs
   */
  const SwaggerDocument = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, SwaggerDocument);

  await app.listen(3000);
}
bootstrap();
