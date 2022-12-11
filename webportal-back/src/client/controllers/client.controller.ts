import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Role } from 'src/decorators/role.decorator';
import { AuthRoleGuard } from 'src/guards/auth-role.guard';
import { User } from 'src/user/entities/user.entity';
import { RoleEnum } from 'src/user/enums/role.enum';
import { CustomerDemandDto } from '../dtos/demand.dto';
import { CustomerDemandEntity } from '../entities/customerDemand.entity';
import { CustomerDemandService } from '../services/customer-demand.service';
import { HouseService } from '../services/house.service';

@Controller()
export class ClientController {
  constructor(
    private readonly houseService: HouseService,
    private readonly customerService: CustomerDemandService,
  ) {}
  @Post('customerDemand')
  @UseGuards(AuthGuard('jwt'), AuthRoleGuard)
  @Role(RoleEnum.client)
  public async registerDemand(
    @Body() payload: CustomerDemandDto,
    @GetUser() currentUser: User,
  ): Promise<CustomerDemandEntity> {
    const { budget, numberOfRooms, surface, hasGarage, housePlan } = payload;
    const savedHouse = await this.houseService.create({
      numberOfRooms,
      surface,
      hasGarage,
      housePlan,
    });
    return await this.customerService.create({
      user: currentUser,
      house: savedHouse,
      budget,
    });
  }

  @Get('customerDemand')
  @UseGuards(AuthGuard('jwt'), AuthRoleGuard)
  @Role(RoleEnum.client)
  public async getAllCustomerDemands(
    @GetUser() user: User,
  ): Promise<CustomerDemandEntity[]> {
    return await this.customerService.findByUser(user);
  }
}
