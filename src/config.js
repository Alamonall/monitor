/* eslint-disable no-undef */
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export const port = process.env.PORT || 3000;
export const postgresUri =
  process.env.POSTGRES_URI || 'postgres://postgres:postgres@localhost/postgres';
export const ttlToken = 60000 * 10;
export const privateKey =
  '-----BEGIN RSA PRIVATE KEY-----\n' +
  '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\n' +
  '-----END RSA PRIVATE KEY-----\n';
