import { Controller, Res, Get, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { TradeinService } from './tradein.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthenticatedUser } from 'src/auth/auth.interfaces';

@UseGuards(JwtAuthGuard)
@Controller('api/tradein')
export class TradeinController {
  constructor(private readonly tradeinService: TradeinService) {}

  @Get('data.json')
  async upload(
    @CurrentUser() user: AuthenticatedUser,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.tradeinService.findAll();

    return res.json(result);
  }
}
