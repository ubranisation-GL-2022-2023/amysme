import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerDemandEntity } from './entities/customerDemand.entity';
import { HouseDataEntity } from './entities/houseData.entity';
import { CustomerDemandService } from './services/customer-demand.service';
import { HouseService } from './services/house.service';

@Module({
  imports: [TypeOrmModule.forFeature([HouseDataEntity, CustomerDemandEntity])],
  controllers: [],
  providers: [CustomerDemandService, HouseService],
  exports: [CustomerDemandService, HouseService],
})
export class ClientModule {}
