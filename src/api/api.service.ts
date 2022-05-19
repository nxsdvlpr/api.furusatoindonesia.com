import { Injectable } from '@nestjs/common';
import { assign, omit } from 'lodash';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { ProcessorService } from 'src/processor/processor.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { TradeinBrand, TradeinCondition } from 'src/tradein/tradein.entity';
import { TradeinService } from 'src/tradein/tradein.service';
import { PartnerService } from 'src/partner/partner.service';

import { VoucherService } from 'src/voucher/voucher.service';
import { RegisterTradeinDto } from './dto/register-tradein.dto';
import { PotensialCasbackDto } from './dto/potensial-cashback.dto';

@Injectable()
export class ApiService {
  constructor(
    private cloudinaryService: CloudinaryService,
    private readonly processorService: ProcessorService,
    private readonly partnerService: PartnerService,
    private readonly tradeinService: TradeinService,
    private readonly voucherService: VoucherService,
    @InjectQueue('mail-queue')
    private mailQueue: Queue,
  ) {}

  async upload(file: Express.Multer.File) {
    return this.cloudinaryService.upload(file);
  }

  async registerTradein(data: RegisterTradeinDto) {
    const tradein = await this.tradeinService.register(
      assign(data, {
        expiredAt: new Date('2022-03-15'),
      }),
    );

    await this.mailQueue.add('sendVoucher', tradein);

    return omit(tradein, 'createdAt', 'updatedAt');
  }

  async potentialCashbackTradein(data: PotensialCasbackDto) {
    const processor = await this.processorService.repo.findOne(
      data.processorId,
    );

    const cashback =
      data.brand === TradeinBrand.ACER
        ? processor.acerCashbackAmount
        : processor.otherCashbackAmount;

    const potensial = await this.voucherService.repo.findOne({
      value: cashback,
    });

    return omit(potensial, 'createdAt', 'updatedAt');
  }

  async validateVoucherTradein(voucher: string) {
    const tradein = await this.tradeinService.repo.findOne({
      voucherCode: voucher,
    });
    return tradein ? true : false;
  }

  async processor() {
    const processors = await this.processorService.getAll();
    return processors.map((processor) => {
      return omit(processor, 'createdAt', 'updatedAt');
    });
  }

  async partners() {
    const partners = await this.partnerService.getAll();
    return partners.map((partner) => {
      return omit(partner, 'createdAt', 'updatedAt');
    });
  }

  async brand() {
    const brands = Object.values(TradeinBrand);
    return brands.map((brand) => ({
      title: brand,
      value: brand,
    }));
  }

  async condition() {
    const conditions = Object.values(TradeinCondition);
    return conditions.map((condition) => ({
      title: condition.charAt(0).toUpperCase() + condition.slice(1),
      value: condition,
    }));
  }

  async tradeinByVoucher(voucherCode: string) {
    return this.tradeinService.getByVoucher(voucherCode);
  }
}
