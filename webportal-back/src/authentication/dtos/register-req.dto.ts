import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { MatchPassword } from 'src/decorators/match-pwd.decorator';
import { User } from 'src/user/entities/user.entity';

export class RegisterRequestDTO extends PickType(User, [
  'username',
  'firstname',
  'lastname',
  'password',
  'email',
]) {
  @IsNotEmpty({ message: 'repeated password is required' })
  @IsString({ message: 'the repeated password must be of form string' })
  @MatchPassword('password', {
    message: 'passwords do not match',
  })
  repeatedPassword: string;
}
