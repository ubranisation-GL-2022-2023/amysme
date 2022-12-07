import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestDto } from '../dtos/login-req.dto';
import { RegisterRequestDTO } from '../dtos/register-req.dto';
import { AuthenticationService } from '../services/authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticatioService: AuthenticationService) {}
  @Post('register')
  public async register(@Body() payload: RegisterRequestDTO): Promise<string> {
    console.log(payload);
    return 'Thank you';
  }

  @Post('login')
  public async login(@Body() payload: LoginRequestDto): Promise<string> {
    console.log(payload);
    return 'Logged in jawek behy';
  }
}
