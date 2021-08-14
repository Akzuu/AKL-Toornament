import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getTournaments } from '../../lib/api/tournaments';

const schema = {
  description: '',
  summary: 'Get tournaments',
  tags: ['Tournaments'],
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          fullName: {
            type: 'string',
            nullable: true,
          },
          scheduledDateStart: {
            type: 'string',
            nullable: true,
          },
          timezone: {
            type: 'string',
          },
          public: {
            type: 'boolean',
          },
          size: {
            type: 'number',
          },
          online: {
            type: 'boolean',
            nullable: true,
          },
          location: {
            type: 'string',
            nullable: true,
          },
          country: {
            type: 'string',
            nullable: true,
          },
          logo: {
            type: 'string',
            nullable: true,
          },
          registrationEnabled: {
            type: 'boolean',
          },
          registrationOpeningDateTime: {
            type: 'boolean',
          },
          registrationClosingDateTime: {
            type: 'boolean',
          },
          id: {
            type: 'string',
          },
          discipline: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
          platforms: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
    },
    500: {
      $ref: 'error',
    },
  },
};

const handler = async (req: FastifyRequest, reply: FastifyReply) => {
  const tournaments = await getTournaments();
  reply.send(tournaments);
};

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler,
    schema,
  });
};
