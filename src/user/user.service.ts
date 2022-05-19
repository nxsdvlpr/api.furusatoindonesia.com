import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { User } from './user.entity';

@QueryService(User)
export class UserService extends TypeOrmQueryService<User> {
  constructor(
    @InjectRepository(User) readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async usernameExists(username: string): Promise<boolean> {
    const exists = await this.repo.find({ username: username });
    return exists.length > 0 ? true : false;
  }
}
