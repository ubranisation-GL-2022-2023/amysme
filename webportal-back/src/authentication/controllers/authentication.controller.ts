import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestDto } from '../dtos/login-req.dto';
import { AuthenticationResponseDto } from '../dtos/login-res.dto';
import { RegisterRequestDTO } from '../dtos/register-req.dto';
import { AuthenticationService } from '../services/authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticatioService: AuthenticationService) {}
  @Post('register')
  public async register(
    @Body() payload: RegisterRequestDTO,
  ): Promise<AuthenticationResponseDto> {
    return await this.authenticatioService.register(payload);
  }

  @Post('login')
  public async login(
    @Body() payload: LoginRequestDto,
  ): Promise<AuthenticationResponseDto> {
    return await this.authenticatioService.login(payload);
  }
}
