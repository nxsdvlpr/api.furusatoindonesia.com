import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthenticatedUser } from 'src/auth/auth.interfaces';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import { BlogService } from './blog.service';
import { BlogDto } from './dto/blog.dto';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';

@Resolver(() => BlogDto)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query(() => Boolean)
  async blogSlugExists(@Args('slug') slug: string): Promise<boolean> {
    return this.blogService.slugExists(slug);
  }

  @Mutation(() => BlogDto)
  async createBlog(
    @CurrentUser() user: AuthenticatedUser,
    @Args('input') input: CreateBlogInput,
  ): Promise<BlogDto> {
    return this.blogService.create(user, input);
  }

  @Mutation(() => BlogDto)
  async updateBlog(@Args('input') input: UpdateBlogInput): Promise<BlogDto> {
    return this.blogService.update(input);
  }
}
