import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/generics/services/crud.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ReclamationEntity } from '../entities/reclamation.entity';

@Injectable()
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

  public async findByUser(user: User): Promise<ReclamationEntity[]> {
    return await this.repo.query(
      `select * from reclamation where user_id = ${user.id}`,
    );
  }
}
