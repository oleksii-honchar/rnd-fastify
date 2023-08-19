import fastify from "fastify";
import colors from "colors";

import { blablo } from "blablo";

import { getPingRoute } from "./routes/get-ping.ts";
import { getIndexRoute } from "./routes/get-index.js";

colors.enable();

const logHeader = "[index]".cyan;
blablo.cleanLog(logHeader, "Starting app");

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
      },
    },
  },
});

server.get(getPingRoute.routePath, getPingRoute.routeHandler);
server.get(getIndexRoute.routePath, getIndexRoute.routeHandler);
server.listen({ port: parseInt(process.env.SERVE_PORT || "9000") }, (err, address) => {
  const logHeader = "[fastify]".cyan;
  if (err) {
    blablo.error(logHeader, err);
    throw err;
  }
  blablo.cleanLog(logHeader, `Server listening at ${address}`);
});
