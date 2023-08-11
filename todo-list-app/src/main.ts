import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Define an asynchronous function named "bootstrap"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Cross-Origin Resource Sharing (CORS) for the app
  app.enableCors({
    // Allow requests from a specific origin
    origin: 'http://localhost:4200',

    // Specify the HTTP methods that are allowed for CORS requests
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

    credentials: true,
  });

  // Start listening for incoming HTTP requests on port 3000
  await app.listen(3000);
}

bootstrap();
