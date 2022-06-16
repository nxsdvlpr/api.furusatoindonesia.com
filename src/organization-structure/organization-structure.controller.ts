import { Controller, Res, Get, Param } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';
import { OrganizationStructureService } from './organization-structure.service';

@Public()
@Controller('/api/organizations')
export class OrganizationStructureController {
  constructor(
    private readonly organizationStructureService: OrganizationStructureService,
  ) {}

  @Get('/')
  async list(@Res() res: Response): Promise<any> {
    const result = await this.organizationStructureService.list();
    return res.json({
      status: true,
      data: result,
    });
  }
}
