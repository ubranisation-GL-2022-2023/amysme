import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/generics/services/crud.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {
    super(repo);
  }

  public async findById(id: string): Promise<User> {
    return await this.repo.findOneBy({ id });
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.repo.findOneBy({ email });
    return user;
  }
  public async findByUsername(username: string): Promise<User> {
    const user = await this.repo.findOneBy({ username });
    return user;
  }
}
