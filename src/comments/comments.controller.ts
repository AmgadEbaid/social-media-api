import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { currentUser } from 'src/decorators/current-user.decorator';
import { users } from 'src/users/user.entity';
import { JwtAuthGuard } from 'src/auth/gards/jwt.gard';
import { CreateComment } from './comments.dto.ts/comment.create.dto';
import { UpdateComment } from './comments.dto.ts/comment.update.dto';
import { Supject } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/actions';
import { AbiliteGuard } from 'src/articles/gards/Abilities.Guard';
import { checkAbilites } from 'src/decorators/checkAbilites.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  CreateComment(
    @currentUser() user: users,
    @Body() createComment: CreateComment,
  ) {
    return this.commentService.createComment(user, createComment);
  }

  @Get('article/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  getComments(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.getComments(id);
  }

  @Patch('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard, AbiliteGuard)
  @checkAbilites({ action: Action.Update, Supject: Supject.comment })
  async updateComment(
    @Param('id') id: number,
    @Body() updatecomment: UpdateComment,
  ) {
    return this.commentService.updateComment(id, updatecomment);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, AbiliteGuard)
  @checkAbilites({ action: Action.Delete, Supject: Supject.comment })
  async deleteComment(@Param('id') id: number) {
    return this.commentService.deleteComment(id);
  }
}
