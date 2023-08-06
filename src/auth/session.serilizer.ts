/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { users } from 'src/users/user.entity';
import { userService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userservice: userService) {
    super();
  }

  serializeUser(user: users, done: Function) {
    console.log('Serializer User');
    done(null, user.id);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.userservice.findone(payload);

    console.log('Deserialize User');
    console.log(user);
    return user ? done(null, user.id) : done(null, null);
  }
}
