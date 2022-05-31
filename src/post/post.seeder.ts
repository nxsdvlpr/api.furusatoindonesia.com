import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostSeeder implements Seeder {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async seed(): Promise<any> {
    const posts = [];

    await this.postRepository.save(posts);
  }

  async drop(): Promise<any> {
    await this.postRepository.clear();
  }
}
