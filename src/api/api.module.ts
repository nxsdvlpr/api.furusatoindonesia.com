import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { HttpModule } from '@nestjs/axios';
import { ProcessorModule } from 'src/processor/processor.module';
import { TradeinModule } from 'src/tradein/tradein.module';
import { PartnerModule } from 'src/partner/partner.module';
import { VoucherModule } from 'src/voucher/voucher.module';

@Module({
  imports: [
    HttpModule,
    ProcessorModule,
    PartnerModule,
    TradeinModule,
    VoucherModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
