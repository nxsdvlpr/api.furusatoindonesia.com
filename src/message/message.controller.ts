import { Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('/api/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async sendMessage(): Promise<any> {
    console.log('hehe');
  }
}
