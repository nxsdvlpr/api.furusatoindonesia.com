import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Timeline } from './timeline.entity';
import { TimelineDto } from './dto/timeline.dto';
import { TimelineSeeder } from './timeline.seeder';
import { TimelineService } from './timeline.service';
import { InstagramService } from 'src/instagram/instagram.service';
import { CommonService } from 'src/common/common.service';
import { TimelineController } from './timeline.controller';
import { TimelineSchedule } from './timeline.schedule';
import { BullModule } from '@nestjs/bull';
import { TimelineProcessor } from './timeline.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'timeline-queue',
    }),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Timeline])],
      services: [TimelineService, InstagramService],
      resolvers: [
        {
          DTOClass: TimelineDto,
          EntityClass: Timeline,
          ServiceClass: TimelineService,
          enableAggregate: true,
        },
      ],
    }),
    TypeOrmModule.forFeature([Timeline]),
  ],
  controllers: [TimelineController],
  providers: [
    TimelineSeeder,
    CommonService,
    TimelineSchedule,
    TimelineProcessor,
  ],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class TimelineModule {}
