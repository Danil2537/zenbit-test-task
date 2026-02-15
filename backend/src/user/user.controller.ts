import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TokenPayload } from '../auth/token-payload.interface';
import { CreateUserDTO } from './DTO/createUser.dto';
import { UserService } from './user.service';
import { User } from '../../generated/prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() request: CreateUserDTO) {
    return this.userService.createUser(request);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() payload: TokenPayload): Promise<User | null> {
    return this.userService.findById(payload.userId);
  }
}
