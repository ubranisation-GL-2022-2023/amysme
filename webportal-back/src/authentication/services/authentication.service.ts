import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { JwtPayload } from '../dtos/jwt-payload.dto';
import { LoginRequestDto } from '../dtos/login-req.dto';
import { AuthenticationResponseDto } from '../dtos/login-res.dto';
import { RegisterRequestDTO } from '../dtos/register-req.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepo: UserService,
    private readonly jwtService: JwtService,
  ) {}
  public async register(
    user: RegisterRequestDTO,
  ): Promise<AuthenticationResponseDto> {
    const { username, email, firstname, lastname, password, role } = user;
    const userByEmail: User = await this.userRepo.findByEmail(email);
    if (userByEmail) {
      throw new BadRequestException(
        'The email used already exists please use another one',
      );
    }
    const userByUsername = await this.userRepo.findByUsername(username);
    if (userByUsername) {
      throw new BadRequestException(
        'The username used already exists please use another one',
      );
    }
    const salt = await bcrypt.genSalt();
    const savedPassword: string = (
      await bcrypt.hash(password, salt)
    ).toString();
    const toBeSaved: User = {
      username,
      firstname,
      lastname,
      email,
      password: savedPassword,
      role,
    };
    const savedUser: User = await this.userRepo.create(toBeSaved);
    return this.createJWT(savedUser);
  }

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
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (isAuthenticated) {
      return this.createJWT(user);
    }
    throw new NotAcceptableException('password provided is incorrect');
  }

  public async createJWT(user: User): Promise<AuthenticationResponseDto> {
    const payload: JwtPayload = {
      email: user.email,
      role: user.role,
      username: user.username,
      id: user.id,
    };
    const token: string = this.jwtService.sign(payload);
    return { token } as AuthenticationResponseDto;
  }
}
