import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private authClient: ClientKafka,
  ) {}
  onModuleInit() {
    this.authClient.subscribeToResponseOf('getToken_auth');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createAccount(@Body() createAccountDto: { name: string }) {
    this.appService.createAccount(createAccountDto.name);
  }

  @Post()
  async loginUser(@Body() loginUserDto: { email: string; password: string }) {
    return await this.appService.loginUser(loginUserDto);
  }
}
