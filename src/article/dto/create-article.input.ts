import { InputType, OmitType } from '@nestjs/graphql';
import { ArticleInput } from './article.input';

@InputType()
export class CreateArticleInput extends OmitType(ArticleInput, [
  'id',
] as const) {}
