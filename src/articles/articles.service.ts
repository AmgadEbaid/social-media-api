import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { articles } from './models/articles.entity';
import { Repository } from 'typeorm';
import { users } from 'src/users/user.entity';
import { UpDateArticle } from './articles.dto/update-article.dto';
import { SerchQuery } from './articles.dto/article.search.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(articles) private articleRepository: Repository<articles>,
  ) {}

  createArticle(user: users, titile: string, slug: string, content: string) {
    const article = new articles();
    (article.titile = titile),
      (article.slug = slug),
      (article.content = content),
      (article.user = user);
    return this.articleRepository.save(article);
  }

  async deleteArticle(id: number) {
    const article = await this.articleRepository.findOneBy({ id: id });
    if (!article) {
      throw new NotFoundException('article not found');
    }
    this.articleRepository.softDelete({ id: id });
  }

  async updateArticle(Id: number, updateArticle: UpDateArticle) {
    await this.articleRepository.update(Id, {
      titile: updateArticle.titile,
      slug: updateArticle.slug,
      content: updateArticle.content,
    });

    return this.articleRepository.findBy({ id: Id });
  }

  getall(skip: number, take: number) {
    return this.articleRepository
      .createQueryBuilder()
      .take(take)
      .skip(skip)
      .getManyAndCount();
  }

  getById(Id: number) {
    return this.articleRepository.findOne({
      where: { id: Id },
      relations: { comments: true },
    });
  }

  searchArticle(serchQuery: SerchQuery) {
    const { query, take, skip, order } = serchQuery;
    const ruslt = this.articleRepository
      .createQueryBuilder()
      .leftJoinAndSelect('articles.user', 'user')
      .where('user.diplayname like:Query', { Query: `%${query}%` })
      .orWhere('articles.titile like:Query', { Query: `%${query}%` })
      .orWhere('articles.content like:Query', { Query: `%${query}%` })
      .orWhere('articles.slug like:Query', { Query: `%${query}%` })
      .take(take)
      .skip(skip);
    if (order === 'DESC') {
      ruslt.orderBy('articles.titile', 'DESC');
    }
    if (order === 'ASC') {
      ruslt.orderBy('articles.id', 'ASC');
    }
    return ruslt.getManyAndCount();
  }

  async addFavorites(user: users, articleId: articles['id']) {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (!article) {
      throw new NotFoundException('article was not found');
    }

    const userLiked = await this.articleRepository
      .createQueryBuilder()
      .innerJoinAndSelect('articles.favoreteUsers', 'users')
      .where('articles.Id = :id', { id: articleId })
      .andWhere('users.id =:userid', { userid: user.id })
      .getOne();

    if (userLiked) {
      return { msg: 'user is already liked this article' };
    }

    await this.articleRepository
      .createQueryBuilder()
      .relation(articles, 'favoreteUsers')
      .of(articleId)
      .add(user);

    await this.articleRepository.increment(
      { id: articleId },
      'favoriteCount',
      1,
    );
  }

  async deleteFavorites(user: users, articleId: articles['id']) {
    const userLiked = await this.articleRepository
      .createQueryBuilder()
      .innerJoinAndSelect('articles.favoreteUsers', 'users')
      .where('articles.Id = :id', { id: articleId })
      .andWhere('users.id =:userid', { userid: user.id })
      .getOne();

    if (!userLiked) {
      throw new NotFoundException('user does not like this article');
    }

    await this.articleRepository
      .createQueryBuilder()
      .relation(articles, 'favoreteUsers')
      .of(articleId)
      .remove(user);

    await this.articleRepository.decrement(
      { id: articleId },
      'favoriteCount',
      1,
    );
  }

  getUserFavorites(user: users) {
    return this.articleRepository
      .createQueryBuilder()
      .leftJoinAndSelect('articles.user', 'users')
      .where('users.id =:userid', { userid: user.id })
      .getManyAndCount();
  }
}
