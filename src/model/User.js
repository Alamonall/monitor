import { Model } from 'objection';

export default class User extends Model {
  id;
  username;
  password;
  type;
  created_at;
  updated_at;

  $beforeInsert(){
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
  
  static get tableName() {
    return 'users';
  }
  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'password', 'type', 'created_at', 'updated_at'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1 },
        password: { type: 'string', minLength: 1 },
        type: { type: 'string' },
        created_at: { type: 'string', default: new Date().toISOString() },
        updated_at: { type: 'string', default: new Date().toISOString() }
      }
    };
  }
}
