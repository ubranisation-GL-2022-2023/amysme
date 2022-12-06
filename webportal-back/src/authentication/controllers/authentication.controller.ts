import { Body, Controller, Post } from '@nestjs/common';
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
}
