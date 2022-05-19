import { Args, Query, Resolver } from '@nestjs/graphql';

import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @Query(() => Boolean)
  async usernameExists(@Args('username') username: string): Promise<boolean> {
    return this.service.usernameExists(username);
  }
}
