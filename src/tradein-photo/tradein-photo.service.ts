import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { TradeinPhoto } from './tradein-photo.entity';

@QueryService(TradeinPhoto)
export class TradeinPhotoService extends TypeOrmQueryService<TradeinPhoto> {
  constructor(
    @InjectRepository(TradeinPhoto)
    private tradeinPhotoRepository: Repository<TradeinPhoto>,
  ) {
    super(tradeinPhotoRepository);
  }
}
