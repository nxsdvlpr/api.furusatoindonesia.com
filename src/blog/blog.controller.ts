import { Controller, Res, Get, Param } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';
import { BlogService } from './blog.service';

@Public()
@Controller('/api/blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/')
  async list(@Res() res: Response): Promise<any> {
    const result = await this.blogService.list();
    return res.json({
      status: true,
      data: result,
    });
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
