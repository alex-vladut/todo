import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { KnexModule } from '@nestjsplus/knex';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { configurations } from './config';
import { UsersModule } from './users/users.module';

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
    KnexModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        return {
          client: 'pg',
          connection: {
            host: config.get('database.host'),
            port: config.get('database.port'),
            user: config.get('database.username'),
            password: config.get('database.password'),
          },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
})
export class AppModule {}
