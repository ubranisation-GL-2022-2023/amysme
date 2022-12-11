import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/generics/services/crud.service';
import { Repository } from 'typeorm';
import { ReclamationEntity } from '../entities/reclamation.entity';

export class ReclamationService extends CrudService<ReclamationEntity> {
  constructor(
    @InjectRepository(ReclamationEntity)
    private readonly repo: Repository<ReclamationEntity>,
  ) {
    super(repo);
  }
  public async findById(id: string): Promise<ReclamationEntity> {
    return await this.repo.findOneBy({ id });
  }
}
