import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class UpdateAccountDto extends PartialType(User) {}
