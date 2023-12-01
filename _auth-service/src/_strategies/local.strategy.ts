import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AppService } from 'src/app.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private appService: AppService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<{ id: number; email: string; name: string }> {
    const user = await this.appService.validateUser({ email, password });

    if (!user) {
      throw new UnauthorizedException('Wrong password or email');
    }

    return user;
  }
}
