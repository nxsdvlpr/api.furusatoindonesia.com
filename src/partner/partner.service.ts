import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { Partner } from './partner.entity';

@QueryService(Partner)
export class PartnerService extends TypeOrmQueryService<Partner> {
  constructor(
    @InjectRepository(Partner)
    private partnerRepository: Repository<Partner>,
  ) {
    super(partnerRepository);
  }

  async getAll(): Promise<Partner[]> {
    return this.partnerRepository.find();
  }
}
