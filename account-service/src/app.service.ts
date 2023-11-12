import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getBalance() {
    return 100;
  }

  transfer({ toUser, amount }: { toUser: any; amount: number }) {
    return { data: 'Success' };
  }

  deposit(amount: number) {}

  withdraw(amount: number) {}
}
