import { Module, Global } from '@nestjs/common';
import { KNEX_CONNECTION } from './constants';
import * as Knex from 'knex';
import { ConfigService } from '@nestjs/config';

const databaseFactory = (config: ConfigService) =>
  Knex({
    client: 'pg',
    connection: {
      host: config.get('database.host'),
      port: config.get('database.port'),
      user: config.get('database.username'),
      password: config.get('database.password'),
    },
  });

@Module({
  providers: [
    {
      provide: KNEX_CONNECTION,
      useFactory: databaseFactory,
      inject: [ConfigService],
    },
  ],
  exports: [KNEX_CONNECTION],
})
@Global()
export class DatabaseModule {}
