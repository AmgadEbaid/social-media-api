import {
  Body,
  Controller,
  Get,
  Post,
  Request,
} from '@nestjs/common/decorators';
import { authService } from './auth.service';
import { UseGuards } from '@nestjs/common/decorators';
import { users } from 'src/users/user.entity';
import { localAuthGard } from './gards/local.gard';
import { createUser } from 'src/users/dtos/create.user.dto';
import { JwtAuthGuard } from './gards/jwt.gard';

@Controller('auth')
export class authControler {
  constructor(private authservice: authService) {}

  @UseGuards(localAuthGard)
  @Post('login')
  async login(@Request() req) {
    return this.authservice.login(req.user);
  }

  @Post('singup')
  async singup(@Body() user: createUser) {
    return this.authservice.sinup(user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getprofile(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
