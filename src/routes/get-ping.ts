import { FastifyReply, FastifyRequest } from "fastify";

const routePath = "/ping";
const routeHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  return "pong\n";
};

export const getPingRoute = { routePath, routeHandler };
