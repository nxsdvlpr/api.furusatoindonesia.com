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

  @FilterableField()
  subject: string;

  @FilterableField({ nullable: true })
  subjectJp: string;

  @FilterableField()
  excerpt: string;

  @FilterableField({ nullable: true })
  excerptJp: string;

  @FilterableField({ nullable: true })
  body: string;

  @FilterableField({ nullable: true })
  bodyJp: string;

  @FilterableField({ nullable: true })
  image: string;

  @FilterableField()
  sequence: number;
}
