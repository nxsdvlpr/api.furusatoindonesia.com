import {
  FilterableField,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Post')
@QueryOptions({ enableTotalCount: true })
export class PostDto {
  @IDField(() => ID)
  id: number;

  @FilterableField()
  group: string;

  @FilterableField()
  title: string;

  @FilterableField({ nullable: true })
  titleJp: string;

  @FilterableField()
  excerpt: string;

  @FilterableField({ nullable: true })
  excerptJp: string;

  @FilterableField()
  body: string;

  @FilterableField({ nullable: true })
  bodyJp: string;

  @FilterableField({ nullable: true })
  icon: string;

  @FilterableField({ nullable: true })
  image: string;

  @FilterableField()
  publish: boolean;

  @FilterableField()
  sequence: number;
}
