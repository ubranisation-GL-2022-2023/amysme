import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/generics/services/crud.service';
import { Repository } from 'typeorm';
import { HouseDataEntity } from '../entities/houseData.entity';

@Injectable()
export class HouseService extends CrudService<HouseDataEntity> {
  constructor(
    @InjectRepository(HouseDataEntity)
    private readonly repo: Repository<HouseDataEntity>,
  ) {
    super(repo);
  }

  public async findById(id: string): Promise<HouseDataEntity> {
    return await this.repo.findOneBy({ id });
  }
}
