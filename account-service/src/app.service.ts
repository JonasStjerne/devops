import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createAccount(account: Account) {
    return await this.prisma.account.create({ data: account });
  }

  async setAccountStatus(setAccountStatusDto: Pick<Account, 'status' | 'id'>) {
    const account = await this.prisma.account.update({
      where: { id: setAccountStatusDto.id },
      data: {
        status: setAccountStatusDto.status,
      },
    });
    return account;
  }

  async getBalance(IBAN: Account['IBAN']) {
    const accountDb = await this.prisma.account.findUniqueOrThrow({
      where: {
        IBAN,
      },
    });
    return accountDb.balance;
  }

  async transfer({
    fromIBAN,
    amount,
    toIBAN,
  }: {
    fromIBAN: Account['IBAN'];
    amount: number;
    toIBAN: Account['IBAN'];
  }) {
    const fromAccount = await this.prisma.account.findUniqueOrThrow({
      where: { IBAN: fromIBAN },
    });
    const toAccount = await this.prisma.account.findUniqueOrThrow({
      where: { IBAN: toIBAN },
    });
    if (!(fromAccount.balance >= amount)) {
      throw new Error('Not enough credit');
    }
    if (
      !this.#accountIsValid(fromAccount) ||
      !this.#accountIsValid(toAccount)
    ) {
      throw new Error('One or more accounts not valid');
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    await this.prisma.account.update({
      where: { id: fromAccount.id },
      data: { ...fromAccount },
    });
    await this.prisma.account.update({
      where: { id: toAccount.id },
      data: { ...toAccount },
    });

    return [fromAccount, toAccount];
  }

  async deposit({ IBAN, amount }: { IBAN: Account['IBAN']; amount: number }) {
    const accountDb = await this.prisma.account.findFirstOrThrow({
      where: { IBAN },
    });
    const newBalance = accountDb.balance + amount;
    const updatedAccountDb = await this.prisma.account.update({
      where: { IBAN },
      data: { balance: newBalance },
    });
    return updatedAccountDb;
  }

  async withdraw({ IBAN, amount }: { IBAN: Account['IBAN']; amount: number }) {
    const accountDb = await this.prisma.account.findFirstOrThrow({
      where: { IBAN },
    });
    const newBalance = accountDb.balance - amount;
    const updatedAccountDb = await this.prisma.account.update({
      where: { IBAN },
      data: { balance: newBalance },
    });
    return updatedAccountDb;
  }

  #accountIsValid(account: Account) {
    const isValid = account.status == 'open';
    return isValid;
  }
}
