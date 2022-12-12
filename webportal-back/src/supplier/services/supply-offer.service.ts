import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/generics/services/crud.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Supplyoffer } from '../entities/supply-offer';

@Injectable()
export class SupplyOfferService extends CrudService<Supplyoffer> {
  constructor(
    @InjectRepository(Supplyoffer)
    private readonly repo: Repository<Supplyoffer>,
  ) {
    super(repo);
  }

  public async findById(id: string): Promise<Supplyoffer> {
    return await this.repo.findOneBy({ id });
  }

  public async findByUser(user: User): Promise<Supplyoffer[]> {
    return await this.repo.query(
      `select * from "supplyoffer" where user_id = "${user.id}";`,
    );
  }
}
