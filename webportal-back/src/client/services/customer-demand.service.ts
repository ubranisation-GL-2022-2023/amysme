import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/generics/services/crud.service';
import { User } from 'src/user/entities/user.entity';
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

  public async findByUser(user: User): Promise<CustomerDemandEntity[]> {
    // need to read about query builder to create an inner join query
    return await this.repo.query(
      `select * from customerDemand where user_id = ${user.id}`,
    );
  }
}
