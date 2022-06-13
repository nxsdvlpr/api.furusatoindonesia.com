import { Controller, Res, Get, Param } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';
import { ArticleService } from './article.service';

@Public()
@Controller('/api/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/:group([a-z-]+)')
  async projects(
    @Param('group') group: string,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.articleService.getArticlesByGroup(group);
    return res.json({
      status: true,
      data: result,
    });
  }

  @Get('/:id([0-9]+)')
  async article(@Param('id') id: number, @Res() res: Response): Promise<any> {
    const result = await this.articleService.getArticleById(id);
    return res.json({
      status: true,
      data: result,
    });
  }
}
