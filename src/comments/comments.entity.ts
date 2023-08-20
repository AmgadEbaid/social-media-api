import { articles } from 'src/articles/models/articles.entity';
import { users } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

import { Exclude, Transform } from 'class-transformer';

@Entity({ name: 'comments' })
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column()
  userId: number;

  @Column()
  articleId: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deleted: Date;

  @ManyToOne(() => users, (users) => users.comments, {
    eager: true,
  })
  user: users;

  @ManyToOne(() => articles, (articles) => articles.comments, {})
  article: articles;
}
