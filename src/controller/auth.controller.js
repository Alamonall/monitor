import { createHash } from 'crypto';
import User from '../model/user.js';

export async function signin() {
  throw new Error('Method not implemented');
}

export async function signup({id, password}) {
  const checkUser = await User.query().findOne({ username: id });
  if(checkUser != null) {
    return {
      code: -32602,
      message: 'User already exists'
    }; 
  }
  const r =  new RegExp(/^[+]?\d{11}/g);
  const type =  r.test(id) ? 'phone' : 'email';

  const hash = createHash('md5').update(password).digest('hex');
  const newUser = await User.query().insertAndFetch({
    username: id,
    type,
    password: hash
  });

  return newUser;
}

export async function logout() {
  throw new Error('Method not implemented');
}
