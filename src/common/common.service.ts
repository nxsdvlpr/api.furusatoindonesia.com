import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CommonService {
  slugify(slug: string): string {
    return slugify(slug, {
      replacement: '-',
      lower: true,
      remove: /[*+~.()'"!:@#]/g,
    });
  }

  randomString(length = 6): string {
    return Math.random().toString(36).substr(2, length);
  }

  yearMonthList() {
    const dateOneYearAgo = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1),
    );

    const year = dateOneYearAgo.getFullYear().toString();
    const month = (dateOneYearAgo.getMonth() + 1).toString().padStart(2, '0');

    const startDate = `${month}-${year}`;

    const d = new Date();
    const m = d.getMonth() + 1;
    const y = d.getFullYear();

    const extractDate = startDate.split('-');

    const yearMonts = [];

    let counter = parseInt(extractDate[0]);

    for (let i = parseInt(extractDate[1]); i <= y; i++) {
      for (let j = counter; j <= 12; j++) {
        if (j > m && i === y) {
          continue;
        }
        const yearDate = i.toString() + j.toString().padStart(2, '0');
        yearMonts.push(parseInt(yearDate));
      }
      counter = 1;
    }

    return yearMonts;
  }

  passwordHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  invokeDeployment() {
    console.log('Invoke deployment');
  }
}
