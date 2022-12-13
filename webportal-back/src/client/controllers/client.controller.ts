import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { userInfo } from 'os';
import { CommunicationService } from 'src/communication/service/communication.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Role } from 'src/decorators/role.decorator';
import { AuthRoleGuard } from 'src/guards/auth-role.guard';
import { User } from 'src/user/entities/user.entity';
import { RoleEnum } from 'src/user/enums/role.enum';
import { CustomerDemandDto } from '../dtos/demand.dto';
import { CustomerDemandEntity } from '../entities/customerDemand.entity';
import { ReclamationEntity } from '../entities/reclamation.entity';
import { CustomerDemandService } from '../services/customer-demand.service';
import { HouseService } from '../services/house.service';
import { ReclamationService } from '../services/reclamation.service';

@Controller()
export class ClientController {
  constructor(
    private readonly houseService: HouseService,
    private readonly customerService: CustomerDemandService,
    private readonly reclamationService: ReclamationService,
    private readonly communicationService: CommunicationService,
    private readonly httpService: HttpService,
  ) { }
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
    this.httpService.post('http://localhost:3010/projectDemand', {
      userId: currentUser._id,
      surface: surface,
      max_budget: budget,
      rooms: numberOfRooms,
    })
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

  @Post('reclamation')
  @UseGuards(AuthGuard('jwt'), AuthRoleGuard)
  @Role(RoleEnum.client)
  public async registerReclamation(
    @Body() payload: ReclamationEntity,
    @GetUser() currentUser: User,
  ): Promise<ReclamationEntity> {
    const reclamation = await this.reclamationService.create({
      user: currentUser,
      content: payload.content,
    });
    // this.httpService.post('http://localhost:3010/reclammation', {
    //   _id: "63962732c6fd4e09ae9de60r",
    //   reclamationId: "qsdf15948srthzrqt18943",
    //   userId: currentUser._id,
    //   content: payload.content,
    //   status: "0",
    // })
    this.communicationService.sendReclamation({
      reclamationId: reclamation.id,
      userId: reclamation.user.id,
      content: reclamation.content,
      status: reclamation.status,
    });
    return reclamation;
  }

  @Get('reclamation')
  @UseGuards(AuthGuard('jwt'), AuthRoleGuard)
  @Role(RoleEnum.client)
  public async getAllReclamationByUser(
    @GetUser() currentUser: User,
  ): Promise<ReclamationEntity[]> {
    return await this.reclamationService.findByUser(currentUser);
  }
}
