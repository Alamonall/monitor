import { Model } from 'objection';

export default class User extends Model {
  static get tableName() {
    return 'users';
  }
  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'type', 'password'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, },
        password: { type: 'string', minLength: 1, },
        type: { type: 'string' } // optional
      }
    };
  }
}
