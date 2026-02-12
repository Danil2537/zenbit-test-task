import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Providers } from '../../../generated/prisma/client';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  password?: string | null;

  @IsNotEmpty()
  provider?: Providers;
}
