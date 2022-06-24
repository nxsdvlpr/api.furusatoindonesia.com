import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async send(options: ISendMailOptions): Promise<SentMessageInfo> {
    return this.mailerService.sendMail(options);
  }
}
