import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@Inject('ACCOUNT_SERVICE') private accountClient: ClientKafka) {}

  onModuleInit() {}

  getHello(): string {
    return 'Hello World!';
  }

  createAccount(accountName: string) {
    this.accountClient.emit('create_account', { name: accountName });
  }
}
