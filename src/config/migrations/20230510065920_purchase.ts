import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("Purchase", (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    table.integer('giftcard_id').unsigned().notNullable().references('id').inTable('giftcards');
    table.decimal('amount', 10, 2).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
})
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("Purchase");
}

