import { InjectQueue } from '@nestjs/bull';
import { Controller, Res, Get, Query } from '@nestjs/common';
import { Queue } from 'bull';
import { Response } from 'express';
import { assign } from 'lodash';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { Public } from 'src/auth/decorators/public.decorator';
import { TimelineService } from './timeline.service';

@Public()
@Controller('/api/timelines/')
export class TimelineController {
  constructor(
    private readonly timelineService: TimelineService,
    @InjectQueue('timeline-queue') private readonly timelineQueue: Queue,
  ) {}

  @Get('/')
  async list(
    @Paginate() query: PaginateQuery,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.timelineService.list(query);
    return res.json(assign(result, { status: true }));
  }

  @Get('/sync')
  async syncFeeds(@Query() query, @Res() res: Response): Promise<any> {
    const limit = parseInt(query.limit) ?? null;

    await this.timelineQueue.add('syncTimeline', {
      limit: limit,
    });

    return res.json({
      status: true,
      message: 'sync success',
    });
  }
}
