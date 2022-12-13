import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqps://uifekcfh:VfOSyCvhgtEaDZyMRB7UimaCXUFoHbMH@stingray.rmq.cloudamqp.com/uifekcfh`,
      ],
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
