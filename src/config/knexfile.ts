
import * as dotenv from 'dotenv';
dotenv.config();
// Update with your config settings.
import {knexSnakeCaseMappers} from 'objection';
import path from'path';


const { DB_USERNAME, DB_PASSWORD, DB_POSTGRES } = process.env;
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config: { [key: string]: import("knex").Knex.Config; } = {

  development: {
    client: 'postgresql',
    connection: {
      database: DB_POSTGRES,
      user: DB_USERNAME,
      password: DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10,
    }, 
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '../migrations')
    },
    ...knexSnakeCaseMappers,
    seeds: {
      directory: './seeds',
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: DB_POSTGRES,
      user: DB_USERNAME,
      password: DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: DB_POSTGRES,
      user: DB_USERNAME,
      password: DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};


export default config;