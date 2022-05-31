import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { Post } from './post.entity';

@QueryService(Post)
export class PostService extends TypeOrmQueryService<Post> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {
    super(postRepository);
  }
}
