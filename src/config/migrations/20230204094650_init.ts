import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable('users', (table)=>{
        table.increments('id').primary();
        table.string('user_name', 50).notNullable();
        table.string('email', 100).unique().notNullable();
        table.string('password', 100).notNullable();
        table.bigInteger('phone_number').notNullable();
        table.string('country', 50).notNullable();
        table.timestamps(true, true);
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users')
}

