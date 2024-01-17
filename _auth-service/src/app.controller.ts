import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('getToken_auth')
  async getToken(loginUserDto: { email: string; password: string }) {
    //get user in userservice with email
    //Check if password matches using bcrypt
    //Sign new token using jwt
    // console.log('Recived request', loginUserDto);
    // this.appService.getToken(loginUserDto.email);
  }
}
