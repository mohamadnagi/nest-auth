import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from '../users/schema/user.schema';
import { ResponseService } from '../common/services/response.service';
import { MailerService } from '../common/services/mailer.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule, // Import ConfigModule for environment variables
  ],
  controllers: [AuthController],
  providers: [AuthService, ResponseService, MailerService,UsersService],
  exports: [AuthService]
})
export class AuthModule {}
