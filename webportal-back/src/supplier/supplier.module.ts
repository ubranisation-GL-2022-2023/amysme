import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterial } from './entities/raw-material';
import { Supplyoffer } from './entities/supply-offer';
import { RawMaterialService } from './services/raw-material.service';
import { SupplyOfferService } from './services/supply-offer.service';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterial, Supplyoffer])],
  controllers: [],
  providers: [RawMaterialService, SupplyOfferService],
  exports: [RawMaterialService, SupplyOfferService],
})
export class SupplierModule {}
