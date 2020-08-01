import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [
    UserResolver,
    UsersRepository,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class UsersModule {}
