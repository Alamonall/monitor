export async function up(knex) {
  knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('users', function (table) {
          table.increments('id');
          table.string('username', 255).notNullable();
          table.string('type', 255).notNullable();
          table.string('password', 255).notNullable();
        });
    }
  });
}


export async function down(knex) {
  return knex.schema.dropTable('users');
}
