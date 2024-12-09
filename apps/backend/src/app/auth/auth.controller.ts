import { ResetPasswordDto } from './dto/reset-password.dto';
import {
  Controller,
  Post,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { Throttle } from '@nestjs/throttler';
import { DynamicSwagger } from '../common/swagger.util';
import { ResponseService } from '../common/services/response.service';
import { Public } from '../common/decorators/public.decorator';
import { VerifyTokenDto } from './dto/verify-token.dto';

@Controller('auth')
@DynamicSwagger({ tag: 'Auth', description: 'Authentication Module' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}

  @Public()
  @Post('register')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @DynamicSwagger({ description: 'Register a new user' })
  async register(
    @Body() registerDto: RegisterDto,
  ) {
    const { user } = await this.authService.register(registerDto);

    return this.responseService.success({
      data: user,
      message: 'User registered successfully',
    });
  }

  @Public()
  @Post('login')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @DynamicSwagger({ description: 'Login with email and password' })
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: any,
    @Res() res: Response,
  ) {
    // Call AuthService login to get tokens
    const { accessToken, refreshToken } = await this.authService.login(
      loginDto,
    );
    // Set the refresh token in an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // Prevent JavaScript access
      //secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
      sameSite: 'strict', // Prevent CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).send(
      this.responseService.success({
        accessToken,
        message: 'Logged in successfully',
      }),
    );
  }

  @Public()
  @Post('forget-password')
  @DynamicSwagger({ description: 'Reset password request' })
  async sendPasswordResetToken(@Body() body: ResetPasswordDto) {
   const { resetToken } = await this.authService.sendPasswordResetToken(body.email);
    return this.responseService.success( { message: 'Password reset email sent successfully', resetToken })
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; password: string }) {
    await this.authService.resetPassword(body.token, body.password);
    return { message: 'Password reset successfully' };
  }

  @Public()
  @DynamicSwagger({ description: 'verify password request token' })
  @Post('verify-reset-password-token')
  async verifyResetPasswordToken(@Body() body: VerifyTokenDto) {
    return this.authService.verifyPasswordResetToken(body.token, );
  }
}
