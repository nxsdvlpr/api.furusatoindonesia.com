import {
  FilterableField,
  FilterableRelation,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType('Article')
@QueryOptions({ enableTotalCount: true })
@FilterableRelation('user', () => UserDto, {
  disableRemove: true,
  nullable: true,
})
export class ArticleDto {
  @IDField(() => ID)
  id: number;

  @FilterableField()
  group: string;

  @FilterableField({ nullable: true })
  slug: string;

  @FilterableField({ nullable: true })
  title: string;

  @FilterableField({ nullable: true })
  titleJa: string;

  @FilterableField({ nullable: true })
  subtitle: string;

  @FilterableField({ nullable: true })
  subtitleJa: string;

  @FilterableField({ nullable: true })
  excerpt: string;

  @FilterableField({ nullable: true })
  excerptJa: string;

  @FilterableField({ nullable: true })
  body: string;

  @FilterableField({ nullable: true })
  bodyJa: string;

  @FilterableField({ nullable: true })
  image: string;

  @FilterableField({ nullable: true })
  icon: string;

  @FilterableField({ nullable: true })
  counter: number;

  @FilterableField()
  published: boolean;

  @FilterableField()
  sequence: number;
}
