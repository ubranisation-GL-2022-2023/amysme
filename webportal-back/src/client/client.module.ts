import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerDemandEntity } from './entities/customerDemand.entity';
import { HouseDataEntity } from './entities/houseData.entity';
import { CustomerDemandService } from './services/customer-demand.service';
import { HouseService } from './services/house.service';
import { ClientController } from './controllers/client.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HouseDataEntity, CustomerDemandEntity])],
  controllers: [ClientController],
  providers: [CustomerDemandService, HouseService],
  exports: [CustomerDemandService, HouseService],
})
export class ClientModule {}
