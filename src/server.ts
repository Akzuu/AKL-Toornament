import config from 'config';
import * as path from 'path';

import fastify, { FastifyServerOptions } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import fastifyHelmet from 'fastify-helmet';
import fastifyCors from 'fastify-cors';
import fastifyAutoLoad from 'fastify-autoload';
import { ISwaggerOptions } from './types/config.types';
import { log } from './lib/log';

const APPLICATION_PORT: number = config.get('port');
const ROUTE_PREFIX: string = config.get('routePrefix');
const FASTIFY_OPTIONS: FastifyServerOptions = config.get('fastifyOptions');
const SWAGGER_OPTIONS: ISwaggerOptions = config.get('swagger');

const initServer = async () => {
  const server = fastify({
    logger: FASTIFY_OPTIONS.logger,
    ignoreTrailingSlash: FASTIFY_OPTIONS.ignoreTrailingSlash,
    ajv: {
      customOptions: {
        removeAdditional: 'all', // Remove additional params from the body etc
      },
    },
  });

  // Register plugins and routes
  server
    .register(fastifySwagger, {
      routePrefix: `${ROUTE_PREFIX}/documentation`,
      swagger: {
        info: {
          title: 'Project AKLL 2020 Web Backend - Match Service',
          description: 'Project AKLL 2020 Web Backend - Match Service',
          version: '1.0.0',
        },
        host: SWAGGER_OPTIONS.host,
        schemes: SWAGGER_OPTIONS.schemes,
        securityDefinitions: {
          bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
          },
        },
        security: [{
          bearerAuth: [],
        }],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [{
          name: 'Utility',
          description: 'Utility endpoints',
        },
        ],
      },
      exposeRoute: true,
    })
    .register(fastifyHelmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ['\'self\''],
          styleSrc: ['\'self\'', '\'unsafe-inline\''],
          imgSrc: ['\'self\'', 'data:', 'validator.swagger.io'],
          scriptSrc: ['\'self\'', 'https: \'unsafe-inline\''],
        },
      },
    })
    .register(fastifyCors, {
      origin: (origin, cb) => {
        cb(null, true);
      },
    })
    .register(fastifyAutoLoad, {
      dir: path.join(__dirname, 'routes'),
      dirNameRoutePrefix: (folderParent, folderName) => `${ROUTE_PREFIX}/${folderName}`,
    })
    .setErrorHandler((error, request, reply) => {
      log.error({
        error: error.name,
        message: error.message,
        url: request.url,
        method: request.method,
        body: request.body,
        stack: error.stack,
      });

      reply.status(500).send({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'Internal Server Error',
      });
    });

  return {
    start: async () => {
      await server.listen(APPLICATION_PORT, '0.0.0.0');
      return server;
    },
  };
};

export default initServer;
