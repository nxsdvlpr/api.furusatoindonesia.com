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
    private readonly userRepository: Repository<User>,
  ) {}

  async seed(): Promise<any> {
    await this.userRepository.save([
      {
        roleId: 1,
        username: `admin@app.com`,
        password: bcrypt.hashSync(`admin@app.com`, 10),
        name: `Administrator`,
        phone: `081100000011`,
      },
      {
        roleId: 2,
        username: `author@app.com`,
        password: bcrypt.hashSync(`author@app.com`, 10),
        name: `Author`,
        phone: `081100000012`,
      },
    ]);
  }

  async drop(): Promise<any> {
    await this.userRepository.clear();
  }
}
