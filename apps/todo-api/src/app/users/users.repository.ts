import { Inject, Injectable } from '@nestjs/common';
import * as Knex from 'knex';

import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { UserEntity } from './user.entity';
import { ConfigService } from '@nestjs/config';

const TABLE_NAME = 'users';

@Injectable()
export class UsersRepository {
  private readonly knex: Knex;
  constructor(private readonly config: ConfigService) {
    this.knex = Knex({
      client: 'pg',
      connection: {
        host: config.get('database.host'),
        port: config.get('database.port'),
        user: config.get('database.username'),
        password: config.get('database.password'),
      },
    });
  }

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
