import { Controller, Res, Get, Param } from '@nestjs/common';
import { Response } from 'express';
import { assign } from 'lodash';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { Public } from 'src/auth/decorators/public.decorator';

import { BlogService } from './blog.service';

@Public()
@Controller('/api/blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/')
  async list(
    @Paginate() query: PaginateQuery,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.blogService.list(query);
    return res.json(assign(result, { status: true }));
  }

  @Get('/:slug([a-zA-Z0-9-,.]+)')
  async get(@Param('slug') slug: string, @Res() res: Response): Promise<any> {
    const result = await this.blogService.getBySlug(slug);
    return res.json({
      status: true,
      data: result,
    });
  }
}
