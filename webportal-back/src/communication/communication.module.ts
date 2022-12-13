import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommController } from './controllers/comm.controller';
import { CommunicationService } from './service/communication.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RECLAMATION',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://ssloczgx:Ga1orj494MmGG5R5FYTr5orsvVQY6rh5@stingray.rmq.cloudamqp.com/ssloczgx',
          ],
          queue: 'reclamation',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  providers: [CommunicationService],
  controllers: [CommController],
  exports: [CommunicationService],
})
export class CommunicationModule {}
