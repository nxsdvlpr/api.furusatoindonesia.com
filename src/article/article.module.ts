import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Article } from './article.entity';
import { ArticleDto } from './dto/article.dto';
import { ArticleSeeder } from './article.seeder';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Article])],
      services: [ArticleService],
      resolvers: [
        {
          DTOClass: ArticleDto,
          CreateDTOClass: CreateArticleInput,
          UpdateDTOClass: UpdateArticleInput,
          EntityClass: Article,
          ServiceClass: ArticleService,
          enableAggregate: true,
          create: {
            disabled: true,
          },
          update: {
            disabled: true,
          },
        },
      ],
    }),
    TypeOrmModule.forFeature([Article]),
  ],
  providers: [ArticleResolver, ArticleSeeder, CommonService],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class ArticleModule {}
