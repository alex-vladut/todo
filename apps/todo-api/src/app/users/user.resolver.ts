import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { uuid } from 'uuidv4';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { UserEntity } from './user.entity';
import { UsersRepository } from './users.repository';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ConfigService } from '@nestjs/config';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly repository: UsersRepository,
    private readonly config: ConfigService
  ) {}

  @Query('me')
  @UseGuards(AuthGuard)
  async me(@Context('user') user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @Mutation()
  async signUp(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const newUser = {
      id: uuid(),
      name,
      email,
      password: await bcrypt.hash(password, 10),
    };

    await this.repository.create(newUser);

    return { ...newUser, password: undefined };
  }

  @Mutation()
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new Error('Wrong email or password');
    }
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      throw new Error('Wrong email or password');
    }
    return jwt.sign(
      { ...user, password: undefined },
      this.config.get('auth.secret')
    );
  }
}
