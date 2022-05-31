import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogSeeder implements Seeder {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async seed(): Promise<any> {
    const blogs = [];

    await this.blogRepository.save(blogs);
  }

  async drop(): Promise<any> {
    await this.blogRepository.clear();
  }
}
