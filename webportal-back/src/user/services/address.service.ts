import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/generics/services/crud.service';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';

@Injectable()
export class AddressService extends CrudService<Address> {
  constructor(
    @InjectRepository(Address) private readonly repo: Repository<Address>,
  ) {
    super(repo);
  }
  public async findById(id: string): Promise<Address> {
    return await this.repo.findOneBy({ id });
  }
}
