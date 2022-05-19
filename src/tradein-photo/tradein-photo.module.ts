import { TradeinPhotoService } from './tradein-photo.service';
import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TradeinPhoto } from './tradein-photo.entity';
import { TradeinPhotoDto } from './dto/tradein-photo.dto';
import { TradeinPhotoSeeder } from './tradein-photo.seeder';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([TradeinPhoto])],
      services: [TradeinPhotoService],
      resolvers: [
        {
          DTOClass: TradeinPhotoDto,
          EntityClass: TradeinPhoto,
          ServiceClass: TradeinPhotoService,
          enableAggregate: true,
        },
      ],
    }),
    TypeOrmModule.forFeature([TradeinPhoto]),
  ],
  providers: [TradeinPhotoSeeder, CommonService],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class TradeinPhotoModule {}
