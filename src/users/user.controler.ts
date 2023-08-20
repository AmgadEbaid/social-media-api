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
import { currentUser } from 'src/decorators/current-user.decorator';
import { users } from './user.entity';
@Controller('users')
export class userscontroler {
  constructor(private userservice: userService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('createuser')
  async create(@Body() user: createUser) {
    return await this.userservice.create(user);
  }

  @Get('/:id')
  findone(@Param('id') id: number) {
    return this.userservice.findone(id);
  }
}
