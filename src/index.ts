// eslint-disable-next-line import/default,import/no-named-as-default,import/no-named-as-default-member
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createRequire } from "module";
import colors from "colors";
import path from "path";

import { blablo } from "blablo";

import { getPingRoute } from "src/routes/get-ping.ts";
import { getIndexRoute } from "src/routes/get-index.ts";
import { getRootRepoDir, setCurrMetaUrl } from "scripts/esm-utils.ts";

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
        colorize: true,
        singleLine: true,
        messageFormat: `${"{msg}".yellow}${
          "{if reqId} [{reqId}]{end}{if req} '{req.method} {req.url}', remote:{req.remoteAddress}:{req.remotePort}, host:{req.hostname} {end}{end}{if res} '{res.statusCode}' | {responseTime}ms{end}"
            .white
        }`,
      },
    },
  },
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
