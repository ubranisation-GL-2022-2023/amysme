import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Address } from '../entities/address.entity';
import { AddressService } from '../services/address.service';
import { UserService } from '../services/user.service';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('account')
export class UserController {
  constructor(
    private readonly userRepo: UserService,
    private readonly addressRepo: AddressService,
  ) {}

  @Put()
  public async updateUser(
    @GetUser() currentUser: User,
    @Body() user: User,
  ): Promise<User> {
    if (user.address) {
      await this.addressRepo.create(user.address);
    }
    return await this.userRepo.update(currentUser.id, user);
  }

  @Delete()
  public async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.userRepo.delete(id);
  }
  @Delete('/address')
  public async deleteAddress(@Param('id') id: string): Promise<Address> {
    return await this.addressRepo.delete(id);
  }
}
