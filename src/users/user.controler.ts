import {
  Controller,
  Get,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { userService } from './users.service';
import { createUser } from './dtos/create.user.dto';
import { use } from 'passport';
@Controller('users')
export class userscontroler {
  constructor(private userservice: userService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('createuser')
  async create(@Body() user: createUser) {
    return await this.userservice.create(user);
  }

  @Get('/:id')
  async findone(@Param('id') id: number) {
    return this.userservice.findone(id);
  }
}
