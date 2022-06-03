import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';

import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';

@Resolver(() => ArticleDto)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => ArticleDto)
  async createArticle(
    @Args('input') input: CreateArticleInput,
  ): Promise<ArticleDto> {
    return this.articleService.create(input);
  }

  @Mutation(() => ArticleDto)
  async updateArticle(
    @Args('input') input: UpdateArticleInput,
  ): Promise<ArticleDto> {
    return this.articleService.update(input);
  }

  @Mutation(() => ArticleDto)
  async changeSequenceArticle(
    @Args('id', { type: () => ID }) id: number,
    @Args('group') group: string,
    @Args('direction') direction: string,
  ): Promise<ArticleDto> {
    return this.articleService.changeSequence(id, group, direction);
  }
}
