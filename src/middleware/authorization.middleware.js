import Session from '../model/Session.js';

const authorization = async (req,res,next) => {
  const headers = req.headers['authorization'];
  if(!headers) {
    return res.status(401).send('Unauthorized');
  }
  const token = headers.split(' ')[1];
  if(!token) {
    return res.status(401).send('Unauthorized');
  }
  const session = await Session.query().findOne({ session_id: token });
  if(!session) {
    return res.status(401).send('Session expired');
  }
  req.userId = session.user_id;
  next();
};

export default authorization;
