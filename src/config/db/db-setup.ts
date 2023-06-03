import knex from "knex";
import knexfile from "../knexfile";
import { Model } from "objection";
import * as dotenv from 'dotenv';
dotenv.config({ path: './../../.env' });

const {NODE_ENV} = process.env;

const Development = ()=>{
    const db = knex(knexfile.development)
    Model.knex(db)
}
const Prod = ()=>{
    const db = knex(knexfile.production)
    Model.knex(db)
}

const dbSetup = ()=>{
    return NODE_ENV === 'production' || 'devlopment' ? Prod() : Development();
}

export default dbSetup;