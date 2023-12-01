import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(getUserDto: { email: string }) {
    const userDb = this.prisma.user.findUnique({
      where: {
        email: getUserDto.email,
      },
    });

    return userDb;
  }
}
