import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('getByEmail_user')
  async getUser(getUserDto: { email: string }) {
    const user = await this.appService.getUserByEmail(getUserDto);

    //respond with the user to the producer of getByEmail_user
  }
}
