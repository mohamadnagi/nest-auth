import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: 'password123' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
}
