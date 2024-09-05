import * as dotenv from 'dotenv';
import 'module-alias/register';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import config from '@infra/configuration/config';

dotenv.config();

const dbConfig = config().database;

export const connectionOption: PostgresConnectionOptions = {
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.name,
  entities: [__dirname + '/../entity/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  synchronize: false,
  migrationsRun: false,
  logging: true,
};

export const connection = new DataSource(connectionOption);
