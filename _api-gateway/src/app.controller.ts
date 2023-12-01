import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private authClient: ClientKafka,
  ) {}
  async onModuleInit() {
    this.authClient.subscribeToResponseOf('getToken_auth');
    await this.authClient.connect();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('account/create')
  createAccount(@Body() createAccountDto: { name: string }) {
    this.appService.createAccount(createAccountDto.name);
  }

  @Post('auth/login')
  async loginUser(@Body() loginUserDto: { email: string; password: string }) {
    return await this.appService.loginUser(loginUserDto);
  }
}
