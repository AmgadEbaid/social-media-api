import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { articles } from 'src/articles/models/articles.entity';
import { Comments } from 'src/comments/comments.entity';

@Entity()
export class users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  diplayname: string;
  @Exclude()
  @Column()
  email: string;
  @Exclude()
  @Column()
  password: string;
  @Column({ default: false })
  IsAdmin: boolean;
  @Exclude()
  @OneToMany(() => articles, (articles) => articles.user)
  articles: articles[];
  @Exclude()
  @OneToMany(() => Comments, (Comments) => Comments.user)
  comments: Comments[];
  @Exclude()
  @ManyToMany(() => articles, (articles) => articles.favoreteUsers)
  favoriteArticle: articles[];
}
