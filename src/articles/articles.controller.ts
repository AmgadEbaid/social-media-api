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
import { currentUser } from 'src/decorators/current-user.decorator';
import { users } from 'src/users/user.entity';
import { createArticle } from './articles.dto/createArticle.dto';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from 'src/auth/gards/jwt.gard';
import { QueryArticle } from './articles.dto/query-article.dto';
import { UpDateArticle } from './articles.dto/update-article.dto';
import { Action } from 'src/casl/actions';
import { SerchQuery } from './articles.dto/article.search.dto';
import { AbiliteGuard } from './gards/Abilities.Guard';
import { checkAbilites } from 'src/decorators/checkAbilites.decorator';
import { Supject } from 'src/casl/casl-ability.factory/casl-ability.factory';
@Controller('articles')
export class ArticlesController {
  constructor(private articleservice: ArticlesService) {}
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
  @UseGuards(JwtAuthGuard, AbiliteGuard)
  @checkAbilites({ action: Action.Update, Supject: Supject.article })
  async updateArticle(
    @Param('id') id: number,
    @Body() updateArticle: UpDateArticle,
  ) {
    return this.articleservice.updateArticle(id, updateArticle);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, AbiliteGuard)
  @checkAbilites({ action: Action.Delete, Supject: Supject.article })
  async deleteArticle(@Param('id') id: number) {
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

  @Delete('deletefavorites/:id')
  @UseGuards(JwtAuthGuard)
  deleteFavorites(
    @currentUser() user: users,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.articleservice.deleteFavorites(user, id);
  }
}
