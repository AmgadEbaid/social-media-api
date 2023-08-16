import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { articles } from 'src/articles/models/articles.entity';
import { Comments } from 'src/comments/comments.entity';

@Entity()
export class users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  diplayname: string;

  @Column()
  email: string;
  @Exclude()
  @Column()
  password: string;
  @Column({ default: false })
  IsAdmin: boolean;

  @OneToMany(() => articles, (articles) => articles.user)
  articles: articles[];

  @OneToMany(() => Comments, (Comments) => Comments.user)
  comments: Comments[];
}
