import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class users {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  diplayname: string;

  @Column()
  email: string;
  @Exclude()
  @Column()
  password: string;
}
