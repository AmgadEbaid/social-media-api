import { type } from 'os';
import { Comments } from 'src/comments/comments.entity';
import { users } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class articles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titile: string;

  @Column()
  slug: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => users, (user) => user.articles)
  user: users;

  @OneToMany(() => Comments, (Comments) => Comments.article)
  comments: Comments[];

  @ManyToMany(() => users, (users) => users.favoriteArticle)
  @JoinTable()
  favoreteUsers: users[];

  @Column({ default: 0 })
  favoriteCount: number;

  @Column()
  userId: number;
  @DeleteDateColumn()
  deletedDate: Date;
}
