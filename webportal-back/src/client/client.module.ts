import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerDemandEntity } from './entities/customerDemand.entity';
import { HouseDataEntity } from './entities/houseData.entity';
import { CustomerDemandService } from './services/customer-demand.service';
import { HouseService } from './services/house.service';
import { ClientController } from './controllers/client.controller';
import { ReclamationEntity } from './entities/reclamation.entity';
import { ReclamationService } from './services/reclamation.service';
import { CommunicationModule } from 'src/communication/communication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HouseDataEntity,
      CustomerDemandEntity,
      ReclamationEntity,
    ]),
    CommunicationModule,
  ],
  controllers: [ClientController],
  providers: [CustomerDemandService, HouseService, ReclamationService],
  exports: [CustomerDemandService, HouseService, ReclamationService],
})
export class ClientModule {}
