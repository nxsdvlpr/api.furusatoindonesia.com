import { TradeinService } from './tradein.service';
import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tradein } from './tradein.entity';
import { TradeinDto } from './dto/tradein.dto';
import { TradeinSeeder } from './tradein.seeder';
import { TradeinResolver } from './tradein.resolver';
import { BullModule } from '@nestjs/bull';
import { TradeinController } from './tradein.controller';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        BullModule.registerQueue({
          name: 'tradein-queue',
        }),
        NestjsQueryTypeOrmModule.forFeature([Tradein]),
      ],
      services: [TradeinService],
      resolvers: [
        {
          DTOClass: TradeinDto,
          EntityClass: Tradein,
          ServiceClass: TradeinService,
          enableAggregate: true,
          create: {
            disabled: true,
          },
          update: {
            disabled: true,
          },
        },
      ],
    }),
    TypeOrmModule.forFeature([Tradein]),
  ],
  providers: [TradeinResolver, TradeinSeeder, CommonService],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
  controllers: [TradeinController],
})
export class TradeinModule {}
