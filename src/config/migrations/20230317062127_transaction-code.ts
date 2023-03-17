import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('transactions', (table)=>{
    table.increments('id').primary();
    table.string('code').notNullable().unique();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('transactions')
}

