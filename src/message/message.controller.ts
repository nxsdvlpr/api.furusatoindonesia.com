import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Queue } from 'bull';
import { Response } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateMessageInput } from './dto/create-message.input';
import { MessageService } from './message.service';

@Public()
@Controller('/api/messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    @InjectQueue('mail-queue') private readonly mailQueue: Queue,
  ) {}

  @Post()
  async sendMessage(
    @Body() data: CreateMessageInput,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.messageService.create(data);

    await this.mailQueue.add('send', {
      to: result.email,
      subject: '[FURUSATO INDONESIA] Pesan Anda telah kami terima',
      template: '/example',
      context: {
        data: result,
      },
    });

    return res.json({
      status: true,
      data: result,
    });
  }
}
