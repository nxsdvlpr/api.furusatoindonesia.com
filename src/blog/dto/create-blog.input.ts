import { InputType, OmitType } from '@nestjs/graphql';
import { BlogInput } from './blog.input';

@InputType()
export class CreateBlogInput extends OmitType(BlogInput, [
  'id',
  'slug',
] as const) {}
