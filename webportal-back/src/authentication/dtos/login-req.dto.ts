import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsLoginConstraint } from 'src/decorators/is-login.decorator';
import { User } from 'src/user/entities/user.entity';

export class LoginRequestDto extends PickType(User, ['password']) {
  @IsNotEmpty({ message: 'login must not be empty' })
  @IsString({ message: 'login must be string' })
  @Validate(IsLoginConstraint, {
    message:
      'login inaccepted: please insert your username or password correctly',
  })
  login: string;
}
