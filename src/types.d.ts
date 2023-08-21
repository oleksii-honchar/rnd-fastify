import { FastifyReply } from "fastify";

export type StringIndex = Record<string, any>;

export interface FastifyUserAuthQuerystring {
  username: string;
  password: string;
}

export interface FastifyHeaders {
  "h-Custom": string;
}

declare module "fastify" {
  interface FastifyReply {
    200: { success: boolean };
    302: { url: string };
    "4xx": { error: string };

    sendFile: (filename: string) => FastifyReply; // Or whatever the right signature is
  }
}
