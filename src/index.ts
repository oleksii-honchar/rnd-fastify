import fastify from "fastify";
import colors from "colors";

import { blablo } from "blablo";

colors.enable();

const logHeader = "[index]".cyan;
blablo.cleanLog(logHeader, "Starting app");

const server = fastify();

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.listen({ port: parseInt(process.env.SERVE_PORT || "9000") }, (err, address) => {
  const logHeader = "[fastify]".cyan;
  if (err) {
    blablo.error(logHeader, err);
    throw err;
  }
  blablo.cleanLog(logHeader, `Server listening at ${address}`);
});
