import { Controller, Res, Get, Param } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';
import { TestimonyService } from './testimony.service';

@Public()
@Controller('/api/testimonies')
export class TestimonyController {
  constructor(private readonly testimonyService: TestimonyService) {}

  @Get('/')
  async list(@Res() res: Response): Promise<any> {
    const result = await this.testimonyService.list();
    return res.json({
      status: true,
      data: result,
    });
  }
}
