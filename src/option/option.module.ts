import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Option } from './option.entity';
import { OptionDto } from './dto/option.dto';
import { OptionSeeder } from './option.seeder';
import { OptionService } from './option.service';
import { OptionResolver } from './option.resolver';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Option])],
      services: [OptionService],
      resolvers: [
        {
          DTOClass: OptionDto,
          EntityClass: Option,
          ServiceClass: OptionService,
          enableAggregate: true,
        },
      ],
    }),
    TypeOrmModule.forFeature([Option]),
  ],
  providers: [OptionResolver, OptionSeeder, CommonService],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class OptionModule {}
