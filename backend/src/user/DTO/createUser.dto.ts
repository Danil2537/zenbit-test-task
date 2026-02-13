import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Providers } from '../../../generated/prisma/client';

export class CreateUserDTO {
  @IsOptional()
  @IsString()
  username?: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string | null;

  @IsOptional()
  @IsNotEmpty()
  provider?: Providers;
}
