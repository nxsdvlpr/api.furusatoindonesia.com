import {
  FilterableField,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Message')
@QueryOptions({ enableTotalCount: true })
export class MessageDto {
  @IDField(() => ID)
  id: number;

  @FilterableField(() => GraphQLISODateTime)
  createdAt: Date;

  @FilterableField()
  fullname: string;

  @FilterableField()
  email: string;

  @FilterableField()
  phone: string;

  @FilterableField()
  body: string;

  @FilterableField()
  alreadyRead: boolean;
}
