import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Address } from '../entities/address.entity';
import { AddressService } from '../services/address.service';
import { UserService } from '../services/user.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UpdateAccountDto } from '../dtos/update-account.dto';
@Controller('account')
export class UserController {
  constructor(
    private readonly userRepo: UserService,
    private readonly addressRepo: AddressService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public getCurrentUser(@GetUser() currentUser: User): User {
    return currentUser;
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  public async updateUser(
    @GetUser() currentUser: User,
    @Body() user: UpdateAccountDto,
  ): Promise<User> {
    if (user.address) {
      let address: Address;
      if (currentUser.address) {
        address = await this.addressRepo.update(
          currentUser.address.id,
          user.address,
        );
      } else {
        address = await this.addressRepo.create(user.address);
      }
      user.address = address;
    }
    return await this.userRepo.update(currentUser.id, user);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  public async deleteUser(@GetUser() currentUser: User): Promise<User> {
    return await this.userRepo.delete(currentUser.id);
  }
  @Delete('/address')
  @UseGuards(AuthGuard('jwt'))
  public async deleteAddress(@GetUser() currentUser: User): Promise<Address> {
    return await this.addressRepo.delete(currentUser.address.id);
  }
}
