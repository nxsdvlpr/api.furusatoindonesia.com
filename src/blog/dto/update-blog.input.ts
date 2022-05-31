import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BlogInput } from './blog.input';

@InputType()
export class UpdateBlogData extends PartialType(BlogInput) {}

@InputType()
export class UpdateBlogInput {
  @Field(() => ID)
  id: number;

  @Field(() => UpdateBlogData)
  @Type(() => UpdateBlogData)
  @ValidateNested()
  update: UpdateBlogData;
}
