import { Module } from '@nestjs/common';
import { userService } from './users.service';
import { userscontroler } from './user.controler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([users])],
  controllers: [userscontroler],
  providers: [userService],
  exports: [userService],
})
export class UsersModule {}
