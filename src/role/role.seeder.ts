import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleSeeder implements Seeder {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
  ) {}

  async seed(): Promise<any> {
    const roles = [
      {
        name: 'admin',
        shortname: 'admin',
      },
      {
        name: 'verifier',
        shortname: 'verifier',
      },
      {
        name: 'estore',
        shortname: 'estore',
      },
    ];

    await this.repo.save(roles);
  }

  async drop(): Promise<any> {
    await this.repo.clear();
  }
}
