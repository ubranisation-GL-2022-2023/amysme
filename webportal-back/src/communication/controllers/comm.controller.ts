import { Controller, Get } from '@nestjs/common';
import { CommunicationService } from '../service/communication.service';

@Controller('communication')
export class CommController {
  constructor(private readonly service: CommunicationService) {}
  @Get()
  public async getmeth() {
    return this.service.sendHello('hello World');
  }
}
