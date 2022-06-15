import { Controller, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';
import { TimelineService } from './timeline.service';

@Public()
@Controller('/api/timelines/')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get('/')
  async getFeeds(@Res() res: Response): Promise<any> {
    const result = await this.timelineService.list();
    return res.json({
      status: true,
      data: result,
    });
  }

  @Get('/sync')
  async syncFeeds(@Res() res: Response): Promise<any> {
    try {
      this.timelineService.sync();
    } catch (error) {
      console.log(error);
    }

    return res.json({
      status: true,
      message: 'sync success',
    });
  }
}
