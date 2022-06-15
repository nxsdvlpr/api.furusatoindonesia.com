import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TimelineService } from './timeline.service';

@Injectable()
export class TimelineSchedule {
  private logger = new Logger(TimelineSchedule.name);

  constructor(private readonly timelineService: TimelineService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async syncTimeline(): Promise<void> {
    this.logger.log('syncTimeline');

    await this.timelineService.sync();
  }
}
