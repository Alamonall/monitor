import { Model } from 'objection';

export default class Session extends Model {
  session_id;
  user_id;
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
    return 'sessions';
  }
  static get idColumn() {
    return 'session_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['session_id', 'user_id', 'created_at', 'updated_at'],
      properties: {
        id: { type: 'integer' },
        session_id: { type: 'string', minLength: 1 },
        user_id: { type: 'integer', minLength: 1 },
        created_at: { type: 'string', default: new Date().toISOString() },
        updated_at: { type: 'string', default: new Date().toISOString() }
      }
    };
  }
}
