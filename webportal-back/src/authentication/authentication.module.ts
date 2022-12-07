import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './controllers/authentication.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './services/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          // expiresIn: 3600,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthenticationService, JwtStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
