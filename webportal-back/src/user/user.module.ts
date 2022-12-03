import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { AddressService } from './services/address.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  providers: [UserService, AddressService],
  exports: [],
  controllers: [],
})
export class UserModule {}
