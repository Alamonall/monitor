/* eslint-disable no-undef */
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export const port = process.env.PORT || 3000;
export const postgresUri = process.env.POSTGRES_URI || 'postgres://postgres:postgres@localhost/postgres';
export const redisUri = process.env.REDIS_URI || 'redis://redis:6379';
