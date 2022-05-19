import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { Voucher } from './voucher.entity';

@QueryService(Voucher)
export class VoucherService extends TypeOrmQueryService<Voucher> {
  constructor(
    @InjectRepository(Voucher)
    private voucherRepository: Repository<Voucher>,
  ) {
    super(voucherRepository);
  }
}
