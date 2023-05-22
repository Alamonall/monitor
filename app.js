import express from 'express';
import logger from 'morgan'
import { JSONRPCServer } from "json-rpc-2.0"
import { logout, signin, signout } from './controller/auth.controller';
import { info, latency } from './controller/main.controller';

const server = new JSONRPCServer();
server.addMethod("signin", signin);
server.addMethod("signout", signout);
server.addMethod("logout", logout);
server.addMethod("info", info);
server.addMethod("latency", latency);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  const jsonRPCRequest = req.body;
  server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
    if (jsonRPCResponse) {
      res.json(jsonRPCResponse);
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(8080);

export default app;
