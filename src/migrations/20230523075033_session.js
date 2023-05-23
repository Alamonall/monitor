export async function up(knex) {
  knex.schema.hasTable('sessions').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('sessions', function (t) {
        t.increments('id');
        t.string('session_id');
        t.integer('user_id').notNullable();
        t.date('created_at', new Date().toISOString()).notNullable();
        t.date('updated_at', new Date().toISOString()).notNullable();
      });
    }
  });
}

export async function down(knex) {
  knex.schema.hasTable('sessions').then((exists) => {
    if (exists) {
      return knex.schema.dropTable('sessions');
    }
  });
}
