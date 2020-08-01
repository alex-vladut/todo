import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TodosRepository } from './todos.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [TodoResolver, TodosRepository],
})
export class TodosModule {}
