import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
import { PostSeeder } from './post.seeder';
import { PostService } from './post.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Post])],
      services: [PostService],
      resolvers: [
        {
          DTOClass: PostDto,
          EntityClass: Post,
          ServiceClass: PostService,
          enableAggregate: true,
        },
      ],
    }),
    TypeOrmModule.forFeature([Post]),
  ],
  providers: [PostSeeder, CommonService],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class PostModule {}
