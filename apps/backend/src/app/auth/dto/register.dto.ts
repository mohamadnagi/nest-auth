import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'mohamad nagi' })
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Name must be less than 50 characters long' })
  name: string;

  @ApiProperty({ example: 'nagi123' })
  @IsString()
  @MinLength(3, { message: 'username must be at least 3 characters long' })
  @MaxLength(50, { message: 'username must be less than 50 characters long' })
  username: string;

  @ApiProperty({ example: '01278130204' })
  @IsString()
  @MinLength(11, { message: 'Mobile must be 11 characters' })
  @MaxLength(11, { message: 'Mobile must be 11 characters' })
  mobile_number: string;

  @ApiProperty({ example: 'mohamad@email.com' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password must be less than 20 characters long' })
  password: string;
}
