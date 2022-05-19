import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from './mail.service';

@Processor('mail-queue')
export class MailConsumer {
  constructor(private readonly mailService: MailService) {}

  @Process('sendVoucher')
  async sendVoucher(job: Job<any>) {
    this.mailService.sendVoucher(job.data);
  }
}
