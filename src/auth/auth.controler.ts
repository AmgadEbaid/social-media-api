import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { authService } from './auth.service';
import { UseGuards } from '@nestjs/common/decorators';
import { users } from 'src/users/user.entity';
import { localAuthGard } from './gards/local.gard';
import { createUser } from 'src/users/dtos/create.user.dto';
import { JwtAuthGuard } from './gards/jwt.gard';
import { currentUser } from 'src/decorators/current-user.decorator';
import { ClassSerializerInterceptor } from '@nestjs/common';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
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
  getprofile(@currentUser() user: users) {
    return user;
  }
}
