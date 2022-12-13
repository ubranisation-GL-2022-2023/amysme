import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterial } from './entities/raw-material';
import { Supplyoffer } from './entities/supply-offer';
import { RawMaterialService } from './services/raw-material.service';
import { SupplyOfferService } from './services/supply-offer.service';
import { SupplierController } from './controllers/supplier.controller';
import { HttpModule } from '@nestjs/axios/dist';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterial, Supplyoffer]), HttpModule],
  controllers: [SupplierController],
  providers: [RawMaterialService, SupplyOfferService],
  exports: [RawMaterialService, SupplyOfferService],
})
export class SupplierModule { }
