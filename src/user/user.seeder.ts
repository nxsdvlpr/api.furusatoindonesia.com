import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async seed(): Promise<any> {
    const admins = [];
    for (let i = 1; i <= 5; i++) {
      admins.push({
        roleId: 1,
        partnerId: Math.floor(Math.random() * 10) + 1,
        username: `admin-${i}@app.com`,
        password: bcrypt.hashSync(`admin-${i}`, 10),
        name: `Administrator #${i}`,
        phone: `08110000001${i}`,
      });
    }

    await this.repo.save(admins);

    const verifiers = [];
    for (let i = 1; i <= 40; i++) {
      verifiers.push({
        roleId: 2,
        partnerId: Math.floor(Math.random() * 10) + 1,
        username: `verifier-${i}@app.com`,
        password: bcrypt.hashSync(`verifier-${i}`, 10),
        name: `Verifier #${i}`,
        phone: `08110000002${i}`,
      });
    }

    await this.repo.save(verifiers);

    const estores = [];
    for (let i = 1; i <= 10; i++) {
      estores.push({
        roleId: 3,
        partnerId: Math.floor(Math.random() * 10) + 1,
        username: `estore-${i}@app.com`,
        password: bcrypt.hashSync(`estore-${i}`, 10),
        name: `E-Store #${i}`,
        phone: `08110000003${i}`,
      });
    }

    await this.repo.save(estores);
  }

  async drop(): Promise<any> {
    await this.repo.clear();
  }
}
