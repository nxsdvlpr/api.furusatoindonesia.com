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
import { Public } from 'src/auth/decorators/public.decorator';
import { CloudinaryService } from './cloudinary.service';

@Controller('/api/upload/:path(*)')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('path') path,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    console.log(path);
    const result = await this.cloudinaryService.upload(path, file);
    return res.json(result);
  }
}
