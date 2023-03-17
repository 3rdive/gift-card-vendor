import dotenv from 'dotenv';
import path from 'path';
import { knexSnakeCaseMappers } from 'objection';

// Update with your config settings.
dotenv.config({ path: '.env' })


const databaseConfig: { [key: string]: import("knex").Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host: `${process.env.DB_HOST}`,
      user: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      database: `${process.env.DB_POSTGRES}`,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, './migrations')
  },
  seeds: {
    directory: path.join(__dirname, './seeds')
  },
...knexSnakeCaseMappers,
  },
  production: {
    client: 'postgresql',
    connection: {
      host: `${process.env.DB_HOST}`,
      user: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      database: `${process.env.DB_POSTGRES}`,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, './../../migrations')
  },
  seeds: {
    directory: __dirname +  './seeds'
  },
...knexSnakeCaseMappers,
  },
};


export default databaseConfig