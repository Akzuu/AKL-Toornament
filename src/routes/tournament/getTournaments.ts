import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getTournaments } from '../../lib/api/tournaments';
import { Tournament } from '../../types/toornament.types';

const schema = {
  description: '',
  summary: 'Get tournaments',
  tags: ['Tournaments'],
  response: {
    200: {
      type: 'array',
      items: Tournament,
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
