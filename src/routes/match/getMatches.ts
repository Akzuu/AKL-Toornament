import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getMatches } from '../../lib/api/matches';
import { Participant } from '../../types/toornament.types';

const schema = {
  description: '',
  summary: 'Get matches',
  tags: ['Matches'],
  querystring: {
    tournamentId: { type: 'string' },
  },
  response: {
    200: {
      type: 'array',
      items: Participant,
    },
    404: {
      $ref: 'error',
    },
    500: {
      $ref: 'error',
    },
  },
};

interface Query {
  tournamentId: string
}

const handler = async (req: FastifyRequest, reply: FastifyReply) => {
  const { tournamentId } = req.query as Query;

  const matches = await getMatches(tournamentId);

  reply.send(matches);
};

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler,
    schema,
  });
};
