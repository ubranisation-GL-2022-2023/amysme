import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqps://ssloczgx:Ga1orj494MmGG5R5FYTr5orsvVQY6rh5@stingray.rmq.cloudamqp.com/ssloczgx`,
      ],
      queue: '3ejja',
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
