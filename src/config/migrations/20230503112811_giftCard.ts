import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("Giftcards", (table) => {
    table.increments("id").primary();
    table.integer("Transaction_code")
      .unsigned()
      .references("code")
      .inTable("transactions");
    table.string("type").notNullable();
    table.string("code", 20).notNullable();
    table.boolean("is_redeemed").defaultTo(false);
    table.decimal("rate");
    table.integer("unit");
    table.decimal("total_amount");
    table.jsonb("image").nullable();
    table.dateTime("expiration_date").nullable();
    table.string("transaction_feedback").notNullable();
    table.integer('userId').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("Giftcards");
}
