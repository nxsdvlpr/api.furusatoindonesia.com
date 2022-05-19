import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { Processor } from './processor.entity';

@QueryService(Processor)
export class ProcessorService extends TypeOrmQueryService<Processor> {
  constructor(
    @InjectRepository(Processor)
    private processorRepository: Repository<Processor>,
  ) {
    super(processorRepository);
  }

  async getAll(): Promise<Processor[]> {
    return this.processorRepository.find();
  }
}
