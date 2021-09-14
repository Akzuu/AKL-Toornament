import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getParticipants } from '../../lib/api/participants';
import { Participant } from '../../types/toornament.types';

const schema = {
  description: '',
  summary: 'Get participants aka teams and team members',
  tags: ['Participants'],
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

  const participants = await getParticipants(tournamentId);

  reply.send(participants);
};

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler,
    schema,
  });
};
