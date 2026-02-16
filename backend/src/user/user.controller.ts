import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './DTO/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() request: CreateUserDTO) {
    return this.userService.createUser(request);
  }
}
