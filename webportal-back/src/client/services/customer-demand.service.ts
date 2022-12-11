import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/generics/services/crud.service';
import { Repository } from 'typeorm';
import { CustomerDemandEntity } from '../entities/customerDemand.entity';

@Injectable()
export class CustomerDemandService extends CrudService<CustomerDemandEntity> {
  constructor(
    @InjectRepository(CustomerDemandEntity)
    private readonly repo: Repository<CustomerDemandEntity>,
  ) {
    super(repo);
  }

  public async findById(id: string): Promise<CustomerDemandEntity> {
    return await this.repo.findOneBy({ id });
  }
}
