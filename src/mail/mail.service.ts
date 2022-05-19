import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { Tradein } from 'src/tradein/tradein.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendVoucher(tradein: Tradein): Promise<any> {
    return this.mailerService.sendMail({
      to: tradein.email,
      subject: '[ACERID] Konfirmasi Pengajuan Trade-In ACER Store',
      template: '/send-voucher',
      context: {
        tradein: tradein,
      },
    });
  }
}
