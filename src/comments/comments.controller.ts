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
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { currentUser } from 'src/decorators/current-user.decorator';
import { users } from 'src/users/user.entity';
import { JwtAuthGuard } from 'src/auth/gards/jwt.gard';
import { CreateComment } from './comments.dto.ts/comment.create.dto';
import { UpdateComment } from './comments.dto.ts/comment.update.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/actions';

@Controller('comments')
export class CommentsController {
  constructor(
    private commentService: CommentsService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

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
  getComments(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.getComments(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateComment(
    @currentUser() user: users,
    @Param('id') id: number,
    @Body() updatecomment: UpdateComment,
  ) {
    console.log(updatecomment);
    const ability = this.caslAbilityFactory.createForUser(user);
    const comment = await this.commentService.findOne(id);

    if (!ability.can(Action.Update, comment)) {
      return new ForbiddenException(
        'user can not update this comment, not authorizer',
      );
    }
    return this.commentService.updateComment(id, updatecomment);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteComment(@currentUser() user: users, @Param('id') id: number) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const comment = await this.commentService.findOne(id);

    if (!ability.can(Action.Delete, comment)) {
      return new ForbiddenException(
        'user can not delete this comment, not authorizer',
      );
    }
    return this.commentService.deleteComment(id);
  }
}
