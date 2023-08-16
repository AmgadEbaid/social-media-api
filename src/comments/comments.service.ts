import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { CreateComment } from './comments.dto.ts/comment.create.dto';
import { users } from 'src/users/user.entity';
import { articles } from 'src/articles/models/articles.entity';
import { UpdateComment } from './comments.dto.ts/comment.update.dto';
import { error } from 'console';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
    @InjectRepository(articles)
    private articleRepository: Repository<articles>,
  ) {}

  async createComment(user: users, createComment: CreateComment) {
    const { articleId, parentId, body } = createComment;

    const article = await this.articleRepository.findOneBy({
      id: articleId,
    });

    if (!article) {
      throw new NotFoundException('article not found');
    }

    let parentComment: Comments;
    if (Number.isInteger(parentId)) {
      parentComment = await this.commentsRepository.findOneBy({
        id: parentId,
        articleId: articleId,
      });
    }

    if (Number.isInteger(parentId) && !parentComment) {
      throw new NotFoundException('parent comment was not found');
    }

    const comment = this.commentsRepository.create({
      body: body,
      user: user,
      article: article,
      parent: parentComment,
    });

    return this.commentsRepository.save(comment);
  }

  async getComments(articlId: number) {
    const article = await this.articleRepository.findOneBy({
      id: articlId,
    });
    if (!article) {
      throw new NotFoundException('article was not found');
    }
    const comments = await this.commentsRepository.manager
      .getTreeRepository(Comments)
      .findBy({ articleId: articlId });

    const children = await this.commentsRepository.manager
      .getTreeRepository(Comments)
      .findDescendantsTree(comments[0]);
    return children;
  }
  findOne(id: number) {
    return this.commentsRepository.findOneBy({ id: id });
  }
  async updateComment(Id: number, updatecomment: UpdateComment) {
    const comment = await this.commentsRepository.findOneBy({ id: Id });
    if (!comment) {
      throw new NotFoundException('comment was not found');
    }
    await this.commentsRepository.update(Id, {
      body: updatecomment.body,
    });

    return this.commentsRepository.findOneBy({ id: Id });
  }

  async deleteComment(Id: number) {
    const comment = await this.commentsRepository.findOneBy({ id: Id });
    if (!comment) {
      throw new NotFoundException('comment was not found');
    }
    return this.commentsRepository.delete(Id);
  }
}
