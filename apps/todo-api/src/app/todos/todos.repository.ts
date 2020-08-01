import { Injectable, Inject } from '@nestjs/common';
import * as Knex from 'knex';

import { KNEX_CONNECTION } from '../database';
import { TodoEntity } from './todo.entity';

const TABLE_NAME = 'todos';

@Injectable()
export class TodosRepository {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  async create(todo: TodoEntity) {
    return await this.knex(TABLE_NAME).insert(todo);
  }

  async findByIdAndUser(id: string, userId: string): Promise<TodoEntity> {
    return await this.knex(TABLE_NAME).where({ id, userId }).first();
  }

  async findByUserId(userId: string): Promise<TodoEntity[]> {
    return await this.knex(TABLE_NAME).where({ userId });
  }

  async findByUserIdAndCompleted(
    userId: string,
    isCompleted: boolean
  ): Promise<TodoEntity[]> {
    return await this.knex(TABLE_NAME).where({ userId, isCompleted });
  }

  async setCompleted(id: string, isCompleted: boolean) {
    return await this.knex(TABLE_NAME).update({ isCompleted }).where({ id });
  }

  async deleteById(id: string) {
    return await this.knex(TABLE_NAME).delete().where({ id });
  }
}
