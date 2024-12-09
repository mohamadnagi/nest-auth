import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', required: false })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'john.doe@example.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'mido123' })
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  username?: string;

  @ApiProperty({ example: '0128130204' })
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  mobile_number?: string;


  @ApiProperty({ example: 'password123', required: false })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsOptional()
  password?: string;

}
