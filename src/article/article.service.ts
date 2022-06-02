import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { assign } from 'lodash';
import { Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { CommonService } from 'src/common/common.service';

import { Article } from './article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';

@QueryService(Article)
export class ArticleService extends TypeOrmQueryService<Article> {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private readonly commonService: CommonService,
  ) {
    super(articleRepository);
  }

  async create(input: CreateArticleInput): Promise<Article> {
    const article = Object.assign(new Article(), input);

    return this.articleRepository.save(article);
  }

  async update(input: UpdateArticleInput): Promise<Article> {
    const article = await this.articleRepository.findOne(input.id);

    if (!article) {
      throw new NotFoundException(
        `Unable to find Article with id: ${input.id}`,
      );
    }

    assign(article, input.update);
    await this.articleRepository.save(article);

    return article;
  }
}
