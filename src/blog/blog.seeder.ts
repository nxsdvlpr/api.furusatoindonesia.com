import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogSeeder implements Seeder {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async seed(): Promise<any> {
    const data = DataFactory.createForClass(Blog).generate(50);
    await this.blogRepository.save(data);
  }

  async drop(): Promise<any> {
    await this.blogRepository.clear();
  }
}
