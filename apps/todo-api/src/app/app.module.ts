import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

import { configurations } from './config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

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
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
