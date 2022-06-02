import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ArticleInput } from './article.input';

@InputType()
export class UpdateArticleData extends PartialType(ArticleInput) {}

@InputType()
export class UpdateArticleInput {
  @Field(() => ID)
  id: number;

  @Field(() => UpdateArticleData)
  @Type(() => UpdateArticleData)
  @ValidateNested()
  update: UpdateArticleData;
}
