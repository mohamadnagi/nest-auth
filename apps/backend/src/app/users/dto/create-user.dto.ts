import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Mohamad Nagi' })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 'mido@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'mido123' })
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  username: string;

  @ApiProperty({ example: '0128130204' })
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  mobile_number: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

}
