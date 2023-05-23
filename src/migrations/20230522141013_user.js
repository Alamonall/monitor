export async function up(knex) {
  knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (t) => {
        t.increments('id');
        t.string('username', 255).notNullable();
        t.string('type', 255).notNullable();
        t.string('password', 255).notNullable();
        t.date('created_at', new Date().toISOString()).notNullable();
        t.date('updated_at', new Date().toISOString()).notNullable();
      });
    }
  });
}

export async function down(knex) {
  knex.schema.hasTable('users').then((exists) => {
    if (exists) {
      return knex.schema.dropTable('users');
    }
  });
}
