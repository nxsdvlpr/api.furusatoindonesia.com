import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { Resource } from './resource.entity';

@QueryService(Resource)
export class ResourceService extends TypeOrmQueryService<Resource> {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {
    super(resourceRepository);
  }
}
