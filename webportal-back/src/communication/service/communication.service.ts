import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TestDto } from '../dtos/test.dto';

@Injectable()
export class CommunicationService {
  constructor(@Inject('FIRSTSERVICE') private readonly client: ClientProxy) {}

  public async sendHello(message: string): Promise<string> {
    console.log(this.client);
    this.client.send('3ejja', message);
    return 'done';
  }

  public async sendObjectHello(message: TestDto): Promise<string> {
    this.client.send('louz', message);
    return 'done';
  }
}
