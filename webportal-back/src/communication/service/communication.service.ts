import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ReclamationEntity } from 'src/client/entities/reclamation.entity';

@Injectable()
export class CommunicationService implements OnApplicationBootstrap {
  constructor(
    @Inject('RECLAMATION') private readonly reclamationClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.reclamationClient.connect();
  }

  public async sendReclamation(payload: any) {
    this.reclamationClient.emit<any>('reclamation', payload);
  }
}
