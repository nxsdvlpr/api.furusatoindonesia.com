import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleSeeder implements Seeder {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async seed(): Promise<any> {
    const articles = [];

    await this.articleRepository.save(articles);
  }

  async drop(): Promise<any> {
    await this.articleRepository.clear();
  }
}
