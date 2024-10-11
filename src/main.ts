import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('File Explorer')
    .setDescription('This API use for creating File Explorer Websites')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:4200', // Ganti dengan URL frontend yang sesuai
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Jika perlu, tergantung kebutuhan
  });
  
  await app.listen(3000);
}
bootstrap();
