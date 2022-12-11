import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerDemandEntity } from './entities/customerDemand.entity';
import { HouseDataEntity } from './entities/houseData.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HouseDataEntity, CustomerDemandEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ClientModule {}
