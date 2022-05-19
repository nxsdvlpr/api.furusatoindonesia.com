import { VoucherService } from './voucher.service';
import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Voucher } from './voucher.entity';
import { VoucherDto } from './dto/voucher.dto';
import { VoucherSeeder } from './voucher.seeder';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Voucher])],
      services: [VoucherService],
      resolvers: [
        {
          DTOClass: VoucherDto,
          EntityClass: Voucher,
          ServiceClass: VoucherService,
          enableAggregate: true,
        },
      ],
    }),
    TypeOrmModule.forFeature([Voucher]),
  ],
  providers: [VoucherSeeder, CommonService],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class VoucherModule {}
