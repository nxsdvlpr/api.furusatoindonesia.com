import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleSeeder implements Seeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seed(): Promise<any> {
    const roles = [
      {
        name: 'Admin',
        shortname: 'admin',
        access: {
          home: true,
          publication_blog: true,
          publication_timeline: true,
          resource: true,
          setting_user_management: true,
        },
      },
      {
        name: 'Author',
        shortname: 'author',
        access: {
          home: true,
          publication_blog: true,
          publication_timeline: true,
          resource: true,
        },
      },
    ];

    await this.roleRepository.save(roles);
  }

  async drop(): Promise<any> {
    await this.roleRepository.clear();
  }
}
