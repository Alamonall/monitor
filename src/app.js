import cors from 'cors';
import express from 'express';
import { JSONRPCServer } from 'json-rpc-2.0';
import knex from 'knex';
import logger from 'morgan';
import { Model } from 'objection';
import { port, postgresUri } from './config.js';
import { logout, signin, signup } from './controller/auth.controller.js';
import { info, latency } from './controller/main.controller.js';
import authorization from './middleware/authorization.middleware.js';
import { parseJsonRpcParams } from './utils.js';

const server = new JSONRPCServer();
server.addMethod('signin', signin);
server.addMethod('signup', signup);
server.addMethod('logout', logout);
server.addMethod('info', info);
server.addMethod('latency', latency);

const app = express();

const corsOpt = {
  origin: '*',
  methods: 'GET,POST',
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
};

app.use(cors(corsOpt));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const knexClient = knex({
  client: 'pg',
  connection: {
    connectionString: postgresUri
  },
  pool: {
    min: 0,
    max: 20,
    propagateCreateError: false
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations'
  }
});

Model.knex(knexClient);

app.get(
  '/',
  authorization,
  (req, res) => {
    server.receive(parseJsonRpcParams(req.query), req['user_id']).then((jsonRPCResponse) => {
      if (jsonRPCResponse) {
        res.json(jsonRPCResponse);
      } else {
        res.sendStatus(204);
      }
    });
  }
);

app.post(
  '/',
  (req, res) => {
    server
      .receive(parseJsonRpcParams(req.body))
      .then((jsonRPCResponse) => {
        if (jsonRPCResponse) {
          res.json(jsonRPCResponse);
        } else {
          res.sendStatus(204);
        }
      });
  }
);

app.listen(port, () => {
  // eslint-disable-next-line no-undef
  console.log(`listening port ${port}`);
});

export default app;
