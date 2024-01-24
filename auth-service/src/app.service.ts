import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('USER_SERVICE') private userClient: ClientKafka) {}

  getHello(): string {
    return 'Hello World!';
  }

  async validateUser(loginUserDto: {
    email: string;
    password: string;
  }): Promise<{ id: number; email: string; name: string } | null> {
    const userDb = await firstValueFrom(
      this.userClient.send('getByEmail_user', { email: loginUserDto.email }),
    );
    if (!userDb) {
      return null;
    }
    const passwordIsMatch = await bcrypt.compare(
      loginUserDto.password,
      userDb.password,
    );

    if (userDb && passwordIsMatch) {
      const { password, ...rest } = userDb;
      return rest;
    }
    return null;
  }
  // async getToken(email: string) {
  //   this.userClient.send('getUserByEmail_user', {email}).subscribe(user => {
  //     return user
  //   })
  // }
}
