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
  titleJp: string;

  @FilterableField({ nullable: true })
  subtitle: string;

  @FilterableField({ nullable: true })
  subtitleJp: string;

  @FilterableField({ nullable: true })
  excerpt: string;

  @FilterableField({ nullable: true })
  excerptJp: string;

  @FilterableField({ nullable: true })
  body: string;

  @FilterableField({ nullable: true })
  bodyJp: string;

  @FilterableField({ nullable: true })
  image: string;

  @FilterableField({ nullable: true })
  icon: string;

  @FilterableField()
  sequence: number;
}
