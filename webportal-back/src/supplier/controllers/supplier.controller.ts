import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Role } from 'src/decorators/role.decorator';
import { AuthRoleGuard } from 'src/guards/auth-role.guard';
import { User } from 'src/user/entities/user.entity';
import { RoleEnum } from 'src/user/enums/role.enum';
import { RawMaterial } from '../entities/raw-material';
import { Supplyoffer } from '../entities/supply-offer';
import { RawMaterialService } from '../services/raw-material.service';
import { SupplyOfferService } from '../services/supply-offer.service';

@Controller('supplier')
@UseGuards(AuthGuard('jwt'), AuthRoleGuard)
export class SupplierController {
  constructor(
    private readonly rawMaterialRepo: RawMaterialService,
    private readonly supplyOfferRepo: SupplyOfferService,
  ) {}

  @Post('offer')
  @Role(RoleEnum.supplier)
  public async submitSupplyOffer(
    @Body() payload: Supplyoffer,
    @GetUser() currentUser: User,
  ): Promise<Supplyoffer> {
    const { comment, rawMaterials } = payload;
    const savedMaterials: RawMaterial[] = [];
    rawMaterials.forEach(async (rawMaterial) => {
      const savedRawMaterial = await this.rawMaterialRepo.create(rawMaterial);
      savedMaterials.push(savedRawMaterial);
    });
    return await this.supplyOfferRepo.create({
      comment,
      user: currentUser,
      srawMaterials: savedMaterials,
    });
  }

  @Get('offer')
  @Role(RoleEnum.supplier)
  public async getMySupplyOffers(
    @GetUser() currentUser: User,
  ): Promise<Supplyoffer[]> {
    return await this.supplyOfferRepo.findByUser(currentUser);
  }
}
