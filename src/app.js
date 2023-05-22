import express from 'express';
import logger from 'morgan';
import { JSONRPCServer } from 'json-rpc-2.0';
import { logout, signin, signout } from './controller/auth.controller.js';
import { info, latency } from './controller/main.controller.js';
import cors from 'cors';
import { port, postgresUri } from './config.js';
import passport from 'passport';
import knex from 'knex';
import { Model } from 'objection';

const server = new JSONRPCServer();
server.addMethod('signin', signin);
server.addMethod('signout', signout);
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

app.get('/', passport.authenticate('bearer', { session: false }), (req, res) => {
  const jsonrpc = req.params['jsonrpc'];
  const method = req.params['method'];
  const params = JSON.parse(req.params['params']);
  const id = req.params['id'];

  server.receive({ jsonrpc, method, params, id }).then((jsonRPCResponse) => {
    if (jsonRPCResponse) {
      res.json(jsonRPCResponse);
    } else {
      res.sendStatus(204);
    }
  });
});

app.post('/', passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const jsonRPCRequest = req.body;
    server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
      if (jsonRPCResponse) {
        res.json(jsonRPCResponse);
      } else {
        res.sendStatus(204);
      }
    });
  });

(() => {
  // TODO: make migrations
})();

app.listen(port, () => {
  console.log(`listening port ${port}`);
});

export default app;
