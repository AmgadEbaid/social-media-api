import { type } from "os";
import { users } from "src/users/user.entity";
import { Entity ,PrimaryGeneratedColumn,Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";

@Entity({ name: 'articles' })
export class articles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titile: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() =>(users) , (users) =>(users.articles))
  user:users

  
}