import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
      table.increments('id').unsigned().primary();
      table.string('user_name', 50).notNullable();
      table.string('email', 100).unique().notNullable();
      table.string('password', 100).notNullable();
      table.string('passwordToken', 100);
      table.string('passwordTokenExpirationDate', 100);
      table.bigInteger('phone_number').notNullable();
      table.string('country', 50).notNullable();
      table.string('verificationToken').notNullable();
      table.string('resetToken');
      table.boolean('isVerified').defaultTo(false);
      table.dateTime('verified');
      table.timestamps(true, true);
    });
  
    await knex.schema.createTable('token', (table) => {
      table.increments('id').unsigned().primary();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.string('ip').notNullable();
      table.string('userAgent').notNullable();
      table.boolean('isValid').notNullable();
      table.integer('userId').unsigned().references('id').inTable('users');
      table.string('refresh_token').notNullable();
    });

    await knex.schema.createTable('transactions', (table) => { // recreate transactions table
      table.increments('id').unsigned().primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      table.integer('code', 4).notNullable().unique();
      table.timestamps(true, true);
    });
  
  }
  
  export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("transactions", (table) => {
      table.dropForeign("user_id");
    });
    await knex.schema.dropTableIfExists('token');
    await knex.schema.dropTableIfExists('users');
    await knex.schema.dropTableIfExists('transactions');
  }
  

