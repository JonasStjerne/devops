import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  createAccount() {}

  setAccountStatus() {}

  getBalance(IBAN: Prisma.AccountWhereInput) {
    return 100;
  }

  transfer({ toUser, amount }: { toUser: any; amount: number }) {
    return { data: 'Success' };
  }

  deposit(amount: number) {}

  withdraw(amount: number) {}
}
