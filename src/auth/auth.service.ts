import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { userService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { users } from 'src/users/user.entity';
import { randomBytes, scrypt, scryptSync } from 'crypto';
import { createUser } from 'src/users/dtos/create.user.dto';

@Injectable()
export class authService {
  constructor(
    private userservice: userService,
    private jwtservice: JwtService,
  ) {}

  async login(user: users) {
    const payload = { username: user.diplayname, sub: user.id };
    return {
      access_token: this.jwtservice.sign(payload),
    };
  }

  async sinup(user: createUser) {
    const users = await this.userservice.find(user.email);
    if (users.length) {
      throw new BadRequestException('email is used');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scryptSync(
      user.password,
      salt,
      40,
    )) as unknown as Buffer;

    const ruslt = salt + '.' + hash.toString('hex');
    user.password = ruslt;
    return await this.userservice.create(user);
  }

  async sinin(email: string, password: string) {
    const [user] = await this.userservice.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, stordHash] = user.password.split('.');

    const hash = (await scryptSync(password, salt, 40)) as unknown as Buffer;

    if (stordHash == hash.toString('hex')) {
      return user;
    } else {
      throw new NotFoundException('bad password');
    }
  }
}
