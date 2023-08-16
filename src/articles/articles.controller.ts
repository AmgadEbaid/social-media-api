import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { currentUser } from 'src/decorators/current-user.decorator';
import { users } from 'src/users/user.entity';
import { createArticle } from './articles.dto/createArticle.dto';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from 'src/auth/gards/jwt.gard';
import { QueryArticle } from './articles.dto/query-article.dto';
import { UpDateArticle } from './articles.dto/update-article.dto';
import { Action } from 'src/casl/actions';
import { articles } from './models/articles.entity';
import { SerchQuery } from './articles.dto/article.search.dto';
@Controller('articles')
export class ArticlesController {
  constructor(
    private articleservice: ArticlesService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}
  @Post('create')
  @UseGuards(JwtAuthGuard)
  createArticle(@currentUser() user: users, @Body() article: createArticle) {
    const { titile, slug, content } = article;
    console.log(article);
    return this.articleservice.createArticle(user, titile, slug, content);
  }

  @Get('/s')
  searchArticles(@Query() serchQuery: SerchQuery) {
    return this.articleservice.searchArticle(serchQuery);
  }
  @Get()
  getArtcles(@Query() body: QueryArticle) {
    console.log('some');
    return this.articleservice.getall(body.skip, body.take);
  }

  @Get('/:id')
  getbyid(@Param('id') id: number) {
    console.log(id);
    return this.articleservice.getById(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateArticle(
    @currentUser() user: users,
    @Param('id') id: number,
    @Body() updateArticle: UpDateArticle,
  ) {
    const article = await this.articleservice.getById(id);
    const ability = this.caslAbilityFactory.createForUser(user);

    if (!ability.can(Action.Update, article)) {
      throw new ForbiddenException('user can not update this article');
    }
    return this.articleservice.updateArticle(id, updateArticle);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteArticle(@currentUser() user: users, @Param('id') id: number) {
    const article = await this.articleservice.getById(id);
    const ability = this.caslAbilityFactory.createForUser(user);

    if (!ability.can(Action.Update, article)) {
      throw new ForbiddenException('user can not update this article');
    }
    return this.articleservice.deleteArticle(id);
  }

  @Post('addfavorites/:id')
  @UseGuards(JwtAuthGuard)
  addFavorites(
    @currentUser() user: users,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.articleservice.addFavorites(user, id);
  }

  @Post('deletefavorites/:id')
  @UseGuards(JwtAuthGuard)
  deleteFavorites(
    @currentUser() user: users,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.articleservice.deleteFavorites(user, id);
  }
}
