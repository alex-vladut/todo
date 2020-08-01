import { Inject, Injectable } from '@nestjs/common';
import * as Knex from 'knex';

import { KNEX_CONNECTION } from '../database';
import { UserEntity } from './user.entity';

const TABLE_NAME = 'users';

@Injectable()
export class UsersRepository {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.knex(TABLE_NAME)
      .select('id', 'name', 'email', 'password')
      .from(TABLE_NAME)
      .where({ email })
      .first();
  }

  async create(user: UserEntity) {
    await this.knex(TABLE_NAME).insert(user);
  }
}
