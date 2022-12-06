import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './controllers/authentication.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
  imports: [UserModule],
})
export class AuthenticationModule {}
