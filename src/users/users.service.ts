import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from './user.entity';
import { privateEncrypt } from 'crypto';
import { Repository } from 'typeorm';
import { createUser } from './dtos/create.user.dto';
@Injectable()
export class userService {
  constructor(
    @InjectRepository(users) private userRepository: Repository<users>,
  ) {}

  async findone(id: number) {
    if (!id) return;

    const user = this.userRepository.findOne({
      where: { id: id },
      relations: { articles: true },
    });
    if (!user) throw new NotFoundException('not found');
    return user;
  }

  async create(userbody: createUser) {
    const user = await this.userRepository.create(userbody);
    await this.userRepository.save(user);
    return user;
  }
  async find(email: string) {
    const users = this.userRepository.find({ where: { email: email } });

    return users;
  }

  update(id: string) {}

  delete(id: string) {}
}
