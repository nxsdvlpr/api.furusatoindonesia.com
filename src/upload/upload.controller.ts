import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Param,
} from '@nestjs/common';
import { Response } from 'express';

import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('/api/upload/:path(*)')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('path') path,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const result = await this.uploadService.upload(path, file);
    return res.json(result);
  }
}
