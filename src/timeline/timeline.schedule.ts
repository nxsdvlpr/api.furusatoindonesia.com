import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';

@Injectable()
export class TimelineSchedule {
  private logger = new Logger(TimelineSchedule.name);

  constructor(
    @InjectQueue('timeline-queue') private readonly timelineQueue: Queue,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async syncTimeline(): Promise<void> {
    await this.timelineQueue.add('syncTimeline', {
      limit: 10,
    });
  }
}
