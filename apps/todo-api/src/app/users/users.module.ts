import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Module({
  providers: [UserResolver, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
