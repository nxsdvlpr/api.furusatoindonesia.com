import { Controller, Res, Get, Param } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';
import { ResourceService } from './resource.service';

@Public()
@Controller('/api/resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get('/')
  async list(@Res() res: Response): Promise<any> {
    const result = await this.resourceService.list();
    return res.json({
      status: true,
      data: result,
    });
  }

  @Get('/:slug([a-zA-Z0-9-,.]+)')
  async get(@Param('slug') slug: string, @Res() res: Response): Promise<any> {
    const result = await this.resourceService.getBySlug(slug);
    return res.json({
      status: true,
      data: result,
    });
  }
}
