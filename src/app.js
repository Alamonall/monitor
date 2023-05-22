import express from 'express';
import logger from 'morgan';
import { JSONRPCServer } from 'json-rpc-2.0';
import { logout, signin, signup } from './controller/auth.controller.js';
import { info, latency } from './controller/main.controller.js';
import cors from 'cors';
import { port, postgresUri } from './config.js';
import knex from 'knex';
import { Model } from 'objection';
import { parseJsonRpcParams } from './utils.js';

const server = new JSONRPCServer();
server.addMethod('signin', signin);
server.addMethod('signup', signup);
server.addMethod('logout', logout);
server.addMethod('info', info);
server.addMethod('latency', latency);

const app = express();

const corsOpt = {
  'origin': '*',
  'methods': 'GET,POST',
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
};

app.use(cors(corsOpt));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const knexClient = knex({
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
    directory: './migrations',
    tableName: 'knex_migrations',
  },
});

Model.knex(knexClient);

app.get('/',
//  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    server.receive(parseJsonRpcParams(req.query)).then((jsonRPCResponse) => {
      if (jsonRPCResponse) {
        res.json(jsonRPCResponse);
      } else {
        res.sendStatus(204);  
      }
    });
  });

app.post('/', 
// passport.authenticate('bearer', { session: false }),
  (req, res) => {
    server.receive(parseJsonRpcParams(req.body)).then((jsonRPCResponse) => {
      if (jsonRPCResponse) {
        res.json(jsonRPCResponse);
      } else {
        res.sendStatus(204);
      }
    });
  });
  
app.listen(port, () => {
  console.log(`listening port ${port}`);
});

export default app;
