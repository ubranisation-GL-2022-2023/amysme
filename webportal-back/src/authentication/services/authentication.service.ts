import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { response } from 'express';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { LoginRequestDto } from '../dtos/login-req.dto';
import { AuthenticationResponseDto } from '../dtos/login-res.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userRepo: UserService) {}
  public async register(user): Promise<User> {
    return await this.userRepo.create(user);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async login(
    payload: LoginRequestDto,
  ): Promise<AuthenticationResponseDto> {
    const { login, password } = payload;
    const user: User =
      (await this.userRepo.findByEmail(login)) ||
      (await this.userRepo.findByUsername(login));
    if (!user)
      throw new NotFoundException(
        "The username or email provided doesn't belong to an existing user",
      );
    // verification of the password
    // if password match : create a token and return it as a Authentication response dto
    let something: boolean;
    if (something) {
      const response: AuthenticationResponseDto = {
        token: 'token string that will be generated',
      };
      return response;
    }
    throw new NotAcceptableException('password provided is incorrect');
  }
}
