import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

import { TimelineService } from './timeline.service';

@Processor('timeline-queue')
export class TimelineProcessor {
  constructor(private readonly timelineService: TimelineService) {}

  private readonly logger = new Logger(TimelineProcessor.name);

  @Process('syncTimeline')
  async handleSyncTimeline(job: Job<any>) {
    this.logger.debug('sync timeline');
    await this.timelineService.sync(job.data.limit);
    this.logger.debug('sync timeline completed');
  }
}
