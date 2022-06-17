import { Controller, Res, Get, Param } from '@nestjs/common';
import { Response } from 'express';
import { assign } from 'lodash';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { Public } from 'src/auth/decorators/public.decorator';
import { ResourceService } from './resource.service';

@Public()
@Controller('/api/resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get('/')
  async list(
    @Paginate() query: PaginateQuery,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.resourceService.list(query);
    return res.json(assign(result, { status: true }));
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
