import { FastifyReply, FastifyRequest } from "fastify";

const routePath = "/";
const routeHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  return "Hello World!\n";
};

export const getIndexRoute = { routePath, routeHandler };
