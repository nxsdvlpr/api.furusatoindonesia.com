import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateMessageInput } from './dto/create-message.input';
import { MessageService } from './message.service';

@Public()
@Controller('/api/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async sendMessage(
    @Body() data: CreateMessageInput,
    @Res() res: Response,
  ): Promise<any> {
    console.log(data);

    return res.json({
      status: true,
      data: data,
    });
  }
}
