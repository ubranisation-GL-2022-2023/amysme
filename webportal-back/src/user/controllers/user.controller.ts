import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Address } from '../entities/address.entity';
import { AddressService } from '../services/address.service';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userRepo: UserService,
    private readonly addressRepo: AddressService,
  ) {}

  @Get()
  public async getAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  @Post()
  public async addUser(@Body() user: User): Promise<User> {
    return this.userRepo.create(user);
  }

  @Put('/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<User> {
    if (user.address) {
      await this.addressRepo.create(user.address);
    }
    return await this.userRepo.update(id, user);
  }
  @Get('address')
  public async listAddresses(): Promise<Address[]> {
    return this.addressRepo.findAll();
  }

  @Delete('/:id')
  public async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.userRepo.delete(id);
  }
  @Delete('/address/:id')
  public async deleteAddress(@Param('id') id: string): Promise<Address> {
    return await this.addressRepo.delete(id);
  }
}
