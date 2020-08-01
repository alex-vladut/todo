import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { uuid } from 'uuidv4';

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
      password, // TODO hash password
    };

    await this.repository.create(newUser);

    return { ...newUser, password: undefined };
  }
}
