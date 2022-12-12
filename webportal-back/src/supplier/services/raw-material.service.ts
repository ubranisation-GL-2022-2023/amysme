import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/generics/services/crud.service';
import { Repository } from 'typeorm';
import { RawMaterial } from '../entities/raw-material';

@Injectable()
export class RawMaterialService extends CrudService<RawMaterial> {
  constructor(
    @InjectRepository(RawMaterial)
    private readonly repo: Repository<RawMaterial>,
  ) {
    super(repo);
  }

  public async findById(id: string): Promise<RawMaterial> {
    return await this.repo.findOneBy({ id });
  }
}
