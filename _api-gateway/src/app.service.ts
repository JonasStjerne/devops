import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('ACCOUNT_SERVICE') private accountClient: ClientKafka,
    @Inject('AUTH_SERVICE') private authClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createAccount(accountName: string) {
    this.accountClient.emit('create_account', { name: accountName });
  }

  async loginUser(loginUserDto: { email: string; password: string }) {
    const result = this.authClient
      .send('getToken_auth', loginUserDto)
      .subscribe((token) => console.log(token));
  }
}
