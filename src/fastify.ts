import fastifyHelmet from '@fastify/helmet';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import compression from '@fastify/compress';
import fastifyCors from '@fastify/cors';

export const setupFastify = (): FastifyAdapter => {
  // Init fastify adapter
  const adapter = new FastifyAdapter({
    trustProxy: true,
  });

  // Set global helmet
  adapter.register(fastifyHelmet, { global: true });
  // Set global gzip compression
  adapter.register(compression, {
    global: true,
    encodings: ['gzip', 'deflate'],
  });

  adapter.register(fastifyCors, {});

  return adapter;
};
