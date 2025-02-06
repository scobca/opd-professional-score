import { Injectable } from '@nestjs/common';

@Injectable()
export class AppProvider {
  getHello(): string {
    return 'Hello World!';
  }

  getBye(): string {
    return 'Bye bye!';
  }
}
