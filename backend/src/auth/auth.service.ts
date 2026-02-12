import { Injectable, UnauthorizedException } from '@nestjs/common';
import ms, { StringValue } from 'ms';
import * as bcrypt from 'bcrypt';
import { User } from '../../generated/prisma/client';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User, response: Response) {
    const expires = new Date();
    const expiration = this.configService.getOrThrow<string>('JWT_EXPIRATION');
    console.log('back login');
    expires.setMilliseconds(
      expires.getMilliseconds() + ms(expiration as StringValue),
    );

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    console.log('tkn pld: ', tokenPayload);
    const token = this.jwtService.sign(tokenPayload);
    console.log(token);
    response.cookie('Authentication', token, {
      secure: false,
      httpOnly: true,
      expires,
    });

    return { tokenPayload };
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      const authenticated = await bcrypt.compare(
        password,
        user?.password ?? '',
      );
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException(
        `Credentials are not valid, error: ${err}`,
      );
    }
  }
}
