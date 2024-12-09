import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schema/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { MailerService } from '../common/services/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService

  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<any> {
    const { email, password, name, username, mobile_number } = registerDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Create a new user
    const user = new this.userModel({
      name,
      email,
      password,
      username,
      mobile_number,
    });
    await user.save();

    return { user };
  }

  async login(loginDto: LoginDto,): Promise<{ refreshToken: string; accessToken: string; }> {
    const { email, password } = loginDto;
    const normalizedIdentifier = email.toLowerCase();

    // Find user by email, username, or phone number
    const user = await this.userModel
      .findOne(
        { email: normalizedIdentifier },
      )
      .exec();

    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate a JWT token
    const payload = { username: user.username, sub: user._id };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    return {refreshToken,accessToken};
  }

  generateToken(payload: Record<string, any>): string {
    return this.jwtService.sign(payload); // Generate JWT
  }

  verifyToken(token: string): Record<string, any> {
    return this.jwtService.verify(token); // Verify JWT
  }

   // Send password reset token
   async sendPasswordResetToken(email: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = crypto.randomBytes(32).toString('hex'); // Generate secure token
    user.passwordResetToken = resetToken;
    user.passwordResetExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // Token valid for 15 minutes
    await user.save();

    // Send reset token via email

    // await this.mailerService.sendMail(
    //   email,
    //   'Password Reset Request',
    //   `Reset your password using this link: ${resetUrl}`,
    // );

    return {resetToken};
  }

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.usersService.findByPasswordResetToken(token);
    if (!user || user.passwordResetExpiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Update password
    user.password = newPassword;
    user.passwordResetToken = null;
    user.passwordResetExpiresAt = null;
    await user.save();
  }
  
  async verifyPasswordResetToken(token: string): Promise<any> {
    const user = await this.usersService.findByPasswordResetToken(token);

    if (!user) {
      throw new NotFoundException('Invalid or expired token');
    }

    if (user.passwordResetExpiresAt < new Date()) {
      throw new BadRequestException('Token has expired');
    }

    return { message: 'Token is valid' };
  }


}
