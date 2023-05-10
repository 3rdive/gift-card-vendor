import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    //Truncate all existing Tables
    await knex.raw('TRUNCATE TABLE "users" CASCADE');


    // INSERT ALL existing entries
    await knex("users").insert([

        {
            id: 1,
            user_name: 'test1',
            email: 'test1@gmail.com',
            password: 'test123',
            phone_number: '0815597654',
            country: 'Rwanda',
            verificationToken: 'faker',
            isVerified : false,
          },
          {
            id: 2,
            user_name: 'test2',
            email: 'test2@gmail.com',
            password: 'test23',
            phone_number: '0815597665',
            country: 'Cuba',
            verificationToken: 'faker',
            isVerified : true,
          },
    ]);

};