import {
  Resolver,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { uuid } from 'uuidv4';

import { TodosRepository } from './todos.repository';
import { TodoEntity } from './todo.entity';
import { AuthGuard } from '../guards/auth.guard';
import { UserEntity } from '../users/user.entity';
import { UsersRepository } from '../users/users.repository';

export interface FilterInput {
  isCompleted: boolean;
}

@Resolver('Todo')
@UseGuards(AuthGuard)
export class TodoResolver {
  constructor(
    private readonly repository: TodosRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  @Mutation()
  async createTodo(
    @Args('title') title: string,
    @Context('user') user: UserEntity
  ): Promise<TodoEntity> {
    const newTodo = {
      id: uuid(),
      title,
      userId: user.id,
      isCompleted: false,
    };
    await this.repository.create(newTodo);
    return newTodo;
  }

  @Mutation()
  async updateTodo(
    @Args('id') id: string,
    @Args('isCompleted') isCompleted: boolean,
    @Context('user') user: UserEntity
  ): Promise<TodoEntity> {
    const todo = await this.repository.findByIdAndUser(id, user.id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    await this.repository.setCompleted(id, isCompleted);
    return { ...todo, isCompleted };
  }

  @Mutation()
  async deleteTodo(
    @Args('id') id: string,
    @Context('user') user: UserEntity
  ): Promise<TodoEntity> {
    const todo = await this.repository.findByIdAndUser(id, user.id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    await this.repository.deleteById(id);
    return todo;
  }

  @ResolveField()
  async user(@Parent() todo: TodoEntity) {
    return await this.usersRepository.findById(todo.userId);
  }

  @Query()
  async listTodos(
    @Args('filter') filter: FilterInput,
    @Context('user') user: UserEntity
  ): Promise<TodoEntity[]> {
    if (filter) {
      return await this.repository.findByUserIdAndCompleted(
        user.id,
        filter.isCompleted
      );
    } else {
      return await this.repository.findByUserId(user.id);
    }
  }
}
