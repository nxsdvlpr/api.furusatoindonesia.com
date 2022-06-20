import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { assign } from 'lodash';
import { Like, Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';

import { CommonService } from 'src/common/common.service';
import { AuthenticatedUser } from 'src/auth/auth.interfaces';

import { Blog } from './blog.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';

@QueryService(Blog)
export class BlogService extends TypeOrmQueryService<Blog> {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    private readonly commonService: CommonService,
  ) {
    super(blogRepository);
  }

  async create(user: AuthenticatedUser, input: CreateBlogInput): Promise<Blog> {
    const blog = Object.assign(new Blog(), input);

    blog.userId = user.id;
    blog.slug = await this.slugify(blog.subject);
    return this.blogRepository.save(blog);
  }

  async update(input: UpdateBlogInput): Promise<Blog> {
    const blog = await this.blogRepository.findOne(input.id);

    if (!blog) {
      throw new NotFoundException(`Unable to find Blog with id: ${input.id}`);
    }

    assign(blog, input.update);
    await this.blogRepository.save(blog);

    return blog;
  }

  async slugExists(slug: string): Promise<boolean> {
    const exists = await this.blogRepository.find({ slug: slug });
    return exists.length > 0 ? true : false;
  }

  async list(query: PaginateQuery): Promise<Paginated<Blog>> {
    const queryBuilder = this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.user', 'user')
      .select(['blog', 'user.id', 'user.name'])
      .where('blog.published = :published', { published: true })
      .andWhere(`blog.publishedAt <= 'TODAY'::DATE`);

    return paginate<Blog>(query, queryBuilder, {
      sortableColumns: ['publishedAt'],
      searchableColumns: ['subject', 'subjectJa'],
      defaultSortBy: [['publishedAt', 'DESC']],
    });
  }

  async getBySlug(slug: string): Promise<Blog> {
    return this.blogRepository.findOne({
      slug,
    });
  }

  private async slugify(title: string): Promise<string> {
    const slug = this.commonService.slugify(title);
    const exists = await this.blogRepository.find({
      slug: Like(`${slug}%`),
    });

    return exists.length > 0
      ? slug + '-' + ++exists.length + this.commonService.randomString()
      : slug;
  }
}
