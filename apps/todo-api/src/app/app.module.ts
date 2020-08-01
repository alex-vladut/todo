import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { configurations } from './config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { TodosModule } from './todos/todos.module';
import { CommonsModule } from './commons/commons.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: configurations,
    }),
    CommonsModule,
    DatabaseModule,
    UsersModule,
    TodosModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
