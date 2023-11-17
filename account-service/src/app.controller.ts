import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Account } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @EventPattern('create_account')
  async create(accountCreateDto: Pick<Account, 'name'>) {
    const newAccount: Omit<Account, 'id'> = {
      name: accountCreateDto.name,
      status: 'open',
      IBAN: Math.random() * 10000,
      accountOwnerId: 10,
      balance: 0,
    };
    const result = await this.appService.create(newAccount);
    return result;
  }

  @EventPattern('setStatus_account')
  async setStatus(data: Record<string, unknown>) {
    // business logic
  }
  @EventPattern('transfer_account')
  async transfer(data: Record<string, unknown>) {
    // business logic
  }
  @EventPattern('deposit_account')
  async deposit(data: Record<string, unknown>) {
    // business logic
  }

  @EventPattern('withdraw_account')
  async withdraw(data: Record<string, unknown>) {
    // business logic
  }
}
