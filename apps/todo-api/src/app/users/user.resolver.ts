import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt';

import { UserEntity } from './user.entity';
import { UsersRepository } from './users.repository';

@Resolver('User')
export class UserResolver {
  constructor(private readonly repository: UsersRepository) {}

  @Query('me')
  async me(@Args('email') email: string): Promise<UserEntity> {
    return await this.repository.findByEmail(email);
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
    const isPassCorrect = await await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      throw new Error('Wrong email or password');
    }
    return { ...user, password: undefined };
  }
}
