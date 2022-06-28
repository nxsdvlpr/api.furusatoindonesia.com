import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Res,
  Param,
} from '@nestjs/common';
import { Response } from 'express';

import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('/api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/:path(*)')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('path') path,
    @Body() data,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const result = await this.uploadService.upload(path, file, data);
    return res.json(result);
  }
}
