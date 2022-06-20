import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { QueryService } from '@nestjs-query/core';
import { Like, Repository } from 'typeorm';
import { assign } from 'lodash';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';

import { CommonService } from 'src/common/common.service';
import { Resource } from './resource.entity';
import { UpdateResourceInput } from './dto/update-resource.input';
import { CreateResourceInput } from './dto/create-resource.input';

@QueryService(Resource)
export class ResourceService extends TypeOrmQueryService<Resource> {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    private readonly commonService: CommonService,
  ) {
    super(resourceRepository);
  }

  async create(input: CreateResourceInput): Promise<Resource> {
    const resource = Object.assign(new Resource(), input);

    resource.slug = await this.slugify(resource.subject);
    return this.resourceRepository.save(resource);
  }

  async update(input: UpdateResourceInput): Promise<Resource> {
    const resource = await this.resourceRepository.findOne(input.id);

    if (!resource) {
      throw new NotFoundException(
        `Unable to find Resource with id: ${input.id}`,
      );
    }

    assign(resource, input.update);
    await this.resourceRepository.save(resource);

    return resource;
  }

  async slugExists(slug: string): Promise<boolean> {
    const exists = await this.resourceRepository.find({ slug: slug });
    return exists.length > 0 ? true : false;
  }

  async list(query: PaginateQuery): Promise<Paginated<Resource>> {
    const queryBuilder = this.resourceRepository
      .createQueryBuilder('resource')
      .where('resource.published = :published', { published: true })
      .andWhere(`resource.publishedAt <= 'TODAY'::DATE`);

    return paginate<Resource>(query, queryBuilder, {
      sortableColumns: ['publishedAt'],
      searchableColumns: ['subject', 'subjectJa'],
      defaultSortBy: [['publishedAt', 'DESC']],
    });
  }

  async getBySlug(slug: string): Promise<Resource> {
    return this.resourceRepository.findOne({
      slug,
    });
  }

  private async slugify(title: string): Promise<string> {
    const slug = this.commonService.slugify(title);
    const exists = await this.resourceRepository.find({
      slug: Like(`${slug}%`),
    });

    return exists.length > 0
      ? slug + '-' + ++exists.length + this.commonService.randomString()
      : slug;
  }
}
