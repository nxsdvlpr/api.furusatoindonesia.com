import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Blog } from './blog.entity';
import { BlogDto } from './dto/blog.dto';
import { BlogSeeder } from './blog.seeder';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Blog])],
      services: [BlogService],
      resolvers: [
        {
          DTOClass: BlogDto,
          CreateDTOClass: CreateBlogInput,
          UpdateDTOClass: UpdateBlogInput,
          EntityClass: Blog,
          ServiceClass: BlogService,
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
    TypeOrmModule.forFeature([Blog]),
  ],
  providers: [BlogResolver, BlogSeeder, CommonService],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class BlogModule {}
