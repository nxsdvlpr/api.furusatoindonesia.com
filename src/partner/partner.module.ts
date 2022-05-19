import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Partner } from './partner.entity';
import { PartnerDto } from './dto/partner.dto';
import { PartnerSeeder } from './partner.seeder';
import { PartnerService } from './partner.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Partner])],
      services: [PartnerService],
      resolvers: [
        {
          DTOClass: PartnerDto,
          EntityClass: Partner,
          ServiceClass: PartnerService,
          enableAggregate: true,
        },
      ],
    }),
    TypeOrmModule.forFeature([Partner]),
  ],
  providers: [PartnerSeeder, CommonService],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class PartnerModule {}
