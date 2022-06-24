import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from './mail.service';

@Processor('mail-queue')
export class MailProcessor {
  constructor(private readonly mailService: MailService) {}

  @Process('send')
  async send(job: Job<ISendMailOptions>) {
    console.log('send email to: ' + job.data.to);

    await this.mailService
      .send(job.data)
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => {
        console.log(e);
      });

    console.log('send email to: ' + job.data.to + ' complete');
  }
}
