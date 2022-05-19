import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Processor } from './processor.entity';
import { ProcessorDto } from './dto/processor.dto';
import { ProcessorSeeder } from './processor.seeder';
import { ProcessorService } from './processor.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Processor])],
      services: [ProcessorService],
      resolvers: [
        {
          DTOClass: ProcessorDto,
          EntityClass: Processor,
          ServiceClass: ProcessorService,
          enableAggregate: true,
        },
      ],
    }),
    TypeOrmModule.forFeature([Processor]),
  ],
  providers: [ProcessorSeeder, CommonService],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class ProcessorModule {}
