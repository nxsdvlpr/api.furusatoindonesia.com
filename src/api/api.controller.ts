import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Get,
  Param,
  HttpStatus,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

import { FileInterceptor } from '@nestjs/platform-express';
import { ApiService } from './api.service';
import { RegisterTradeinDto } from './dto/register-tradein.dto';
import { PotensialCasbackDto } from './dto/potensial-cashback.dto';

@Public()
@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.apiService.upload(file);
    return res.json(result);
  }

  @Post('tradein/register')
  async registerTradein(
    @Body() data: RegisterTradeinDto,
    @Res() res: Response,
  ) {
    try {
      const tradein = await this.apiService.registerTradein(data);
      return res.json({
        success: true,
        data: tradein,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'An error occurred. Please try again later',
      });
    }
  }

  @Post('tradein/potential-cashback')
  async potentialCashbackTradein(
    @Body() data: PotensialCasbackDto,
    @Res() res: Response,
  ) {
    const potential = await this.apiService.potentialCashbackTradein(data);
    res.json({
      success: true,
      data: potential,
    });
  }

  @Get('tradein/validate-voucher/:voucher')
  async validateVoucherTradein(
    @Param('voucher') voucher: string,
    @Res() res: Response,
  ) {
    const status = await this.apiService.validateVoucherTradein(voucher);
    res.json({
      status: status,
    });
  }

  @Get('tradein/by-voucher/:voucher')
  async tradeinByVoucher(
    @Param('voucher') voucherCode: string,
    @Res() res: Response,
  ) {
    const result = await this.apiService.tradeinByVoucher(voucherCode);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Voucher not found',
      });
    }

    return res.json({
      success: true,
      data: result,
    });
  }

  @Get('partners')
  async getPartners(@Res() res: Response) {
    const results = await this.apiService.partners();
    return res.json({
      success: true,
      data: results,
    });
  }

  @Get('brand')
  async getBrand(@Res() res: Response) {
    const results = await this.apiService.brand();
    return res.json({
      success: true,
      data: results,
    });
  }

  @Get('processor')
  async getProcessor(@Res() res: Response) {
    const results = await this.apiService.processor();
    return res.json({
      success: true,
      data: results,
    });
  }

  @Get('condition')
  async getCondition(@Res() res: Response) {
    const results = await this.apiService.condition();
    return res.json({
      success: true,
      data: results,
    });
  }
}
