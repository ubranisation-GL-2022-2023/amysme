import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterial } from './entities/raw-material';
import { Supplyoffer } from './entities/supply-offer';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterial, Supplyoffer])],
  controllers: [],
  providers: [],
  exports: [],
})
export class SupplierModule {}
