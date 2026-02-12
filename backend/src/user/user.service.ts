import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Providers, User } from '../../generated/prisma/client';
import { CreateUserDTO } from './DTO/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<User | null> {
    const password = createUserDTO.password
      ? await bcrypt.hash(createUserDTO.password, 10)
      : null;

    return this.prisma.user.create({
      data: {
        username: createUserDTO.username,
        email: createUserDTO.email,
        password,
        provider: createUserDTO.provider ?? Providers.local,
      },
    });
  }

  async findOne(username: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { username },
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }
}
