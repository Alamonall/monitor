import { postgresUri } from './src/config.js';

export default {
  development: {
    client: 'pg',
    connection: {
      connectionString: postgresUri,
    },
    pool: {
      min: 0,
      max: 20,
      propagateCreateError: false,
    },
    migrations: {
      directory: './src/migrations',
      tableName: 'knex_migrations',
    },
  }
};
