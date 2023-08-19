// eslint-disable-next-line import/default
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createRequire } from "module";
import colors from "colors";
import { readFileSync } from "fs";
import path from "path";

import { blablo } from "blablo";

import { getPingRoute } from "./routes/get-ping.ts";
import { getIndexRoute } from "./routes/get-index.js";
import { getRootRepoDir, setCurrMetaUrl } from "scripts/esm-utils.ts";
import chalk from "chalk";

setCurrMetaUrl(import.meta.url);
colors.enable();
const require = createRequire(import.meta.url);

const logHeader = "[index]".cyan;
blablo.cleanLog(logHeader, "Starting app");

const server: FastifyInstance = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        colorize: false,
        singleLine: true,
      },
    },
  },
  // https: {
  //   key: readFileSync(path.join(getRootRepoDir(), "./src/keys/privkey.pem")),
  //   cert: readFileSync(path.join(getRootRepoDir(), "./src/keys/fullchain.pem")),
  // },
});

server.register(require("@fastify/static"), {
  root: path.join(getRootRepoDir(), "dist"),
  prefix: "/",
});

server.get("/favicon.ico", function (request: FastifyRequest, reply: FastifyReply) {
  reply.sendFile("favicons/favicon.ico");
});

server.get(getPingRoute.routePath, getPingRoute.routeHandler);
server.get(getIndexRoute.routePath, getIndexRoute.routeHandler);
server.listen({ port: parseInt(process.env.SERVE_PORT || "9000"), host: "0.0.0.0" }, (err, address) => {
  const logHeader = "[fastify]".cyan;
  if (err) {
    blablo.error(logHeader, err);
    throw err;
  }
  blablo.cleanLog(logHeader, `Server listening at ${address}`);
});
