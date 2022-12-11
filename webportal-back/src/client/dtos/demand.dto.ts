import { IntersectionType } from '@nestjs/mapped-types';
import { CustomerDemandEntity } from '../entities/customerDemand.entity';
import { HouseDataEntity } from '../entities/houseData.entity';

export class CustomerDemandDto extends IntersectionType(
  CustomerDemandEntity,
  HouseDataEntity,
) {}
