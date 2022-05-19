import { AuthenticatedUser } from './../auth/auth.interfaces';
import {} from '@nestjs-query/query-graphql';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import { CreateTradeinInput } from './dto/create-tradein.input.dto';
import { TradeinDto } from './dto/tradein.dto';
import { UpdateTradeinInput } from './dto/update-tradein.input.dto';
import { TradeinService } from './tradein.service';
import { ValidateVoucherInput } from './dto/validate-voucher.input.dto';
import { TradeinSummaryDto } from './dto/tradein-summary.dto';
import { DailyTradeinSummaryDto } from './dto/daily-tradein-summary.dto';

@Resolver(() => TradeinDto)
export class TradeinResolver {
  constructor(private readonly tradeinService: TradeinService) {}

  @Query(() => [DailyTradeinSummaryDto])
  async dailyTradeinSummary(): Promise<DailyTradeinSummaryDto[]> {
    return this.tradeinService.dailyTradeinSummary();
  }

  @Query(() => TradeinSummaryDto)
  async tradeinSummary(): Promise<TradeinSummaryDto> {
    return this.tradeinService.summary();
  }

  @Mutation(() => TradeinDto)
  async createTradein(
    @Args('input') input: CreateTradeinInput,
  ): Promise<TradeinDto> {
    return this.tradeinService.create(input);
  }

  @Mutation(() => TradeinDto)
  async updateTradein(
    @CurrentUser() user: AuthenticatedUser,
    @Args('input') input: UpdateTradeinInput,
  ): Promise<TradeinDto> {
    return this.tradeinService.update(user, input);
  }

  @Mutation(() => TradeinDto)
  async handleVoucher(
    @CurrentUser() user: AuthenticatedUser,
    @Args('voucherCode') voucherCode: string,
  ): Promise<TradeinDto> {
    return this.tradeinService.handleVoucher(user, voucherCode);
  }

  @Mutation(() => TradeinDto)
  async validateVoucher(
    @CurrentUser() user: AuthenticatedUser,
    @Args('input') input: ValidateVoucherInput,
  ): Promise<TradeinDto> {
    return this.tradeinService.validateVoucher(user, input);
  }
}
