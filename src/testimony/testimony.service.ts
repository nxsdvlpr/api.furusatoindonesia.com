import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { QueryService } from '@nestjs-query/core';
import { Repository } from 'typeorm';
import { assign } from 'lodash';

import { Testimony } from './testimony.entity';
import { UpdateTestimonyInput } from './dto/update-testimony.input';
import { CreateTestimonyInput } from './dto/create-testimony.input';

@QueryService(Testimony)
export class TestimonyService extends TypeOrmQueryService<Testimony> {
  constructor(
    @InjectRepository(Testimony)
    private testimonyRepository: Repository<Testimony>,
  ) {
    super(testimonyRepository);
  }

  async create(input: CreateTestimonyInput): Promise<Testimony> {
    const testimony = Object.assign(new Testimony(), input);

    return this.testimonyRepository.save(testimony);
  }

  async update(input: UpdateTestimonyInput): Promise<Testimony> {
    const testimony = await this.testimonyRepository.findOne(input.id);

    if (!testimony) {
      throw new NotFoundException(
        `Unable to find Testimony with id: ${input.id}`,
      );
    }

    assign(testimony, input.update);
    await this.testimonyRepository.save(testimony);

    return testimony;
  }

  async list(): Promise<Testimony[]> {
    return this.testimonyRepository.find({
      order: { createdAt: 'DESC' },
      take: 10,
    });
  }
}
