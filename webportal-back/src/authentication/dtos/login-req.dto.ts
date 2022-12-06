import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class LoginRequestDto extends PickType(User, ['password']) {
  @IsNotEmpty({ message: 'login must not be empty' })
  @IsString({ message: 'login must be string' })
  login: string;
}
