import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userRepo: UserService) {}
  public async register(user): Promise<User> {
    return await this.userRepo.create(user);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async login(creadentials) {}
}
