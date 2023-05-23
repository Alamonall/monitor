import { createHash, randomUUID } from 'crypto';
import Session from '../model/Session.js';
import User from '../model/User.js';

export async function signin({ id, password }) {
  const hash = createHash('md5').update(password).digest('hex');
  const user = await User.query().findOne({ username: id, password: hash });
  if (!user) {
    return {
      code: -32602,
      message: 'User doesnt exists'
    };
  }

  const token = randomUUID({ disableEntropyCache: true });
  console.log(token);
  const session = await Session.query().insertAndFetch({
    session_id: token,
    user_id: user.id
  });
  
  return {
    token: session.session_id
  };
}

export async function signup({ id, password }) {
  console.log({ id, password});
  const checkUser = await User.query().findOne({ username: id });
  if (checkUser != null) {
    return {
      code: -32602,
      message: 'User already exists'
    };
  }
 
  const r = new RegExp(/^[+]?\d{11}/g);
  const type = r.test(id) ? 'phone' : 'email';

  const hash = createHash('md5').update(password).digest('hex');
  const newUser = await User.query().insertAndFetch({
    username: id,
    type,
    password: hash
  });

  return newUser;
}

export async function logout({ all }, { userId }) {
  if(all){
    await Session.query().delete().where({ user_id: userId });
  }
  await Session.query().delete().where({ user_id: userId }).first();

  return 'ok';
}
