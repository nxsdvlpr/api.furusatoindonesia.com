import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginInputDto } from './dto/login-input.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthenticatedUser } from './auth.interfaces';
import { UpdateProfileInputDto } from './dto/update-profile.input.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { Public } from './decorators/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => LoginResponseDto)
  async login(@Args('input') input: LoginInputDto): Promise<LoginResponseDto> {
    const user = await this.authService.validateUser(
      input.username,
      input.password,
    );

    if (!user) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    return this.authService.login(user);
  }

  @Query(() => UserDto)
  me(@CurrentUser() user: AuthenticatedUser): Promise<UserDto> {
    return this.authService.currentUser(user);
  }

  @Mutation(() => UserDto)
  updateProfile(
    @Args('input') input: UpdateProfileInputDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<UserDto> {
    return this.authService.updateUser(user, input);
  }
}
