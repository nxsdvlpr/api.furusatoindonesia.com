import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendVoucher(tradein: any): Promise<any> {
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
