import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getMatches } from '../../lib/api/matches';

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
      items: {
        type: 'object',
        properties: {
          scheduledDatetime: {
            type: 'string',
            nullable: true,
          },
          publicNote: {
            type: 'string',
            nullable: true,
          },
          privateNote: {
            type: 'string',
            nullble: true,
          },
          id: {
            type: 'string',
          },
          status: {
            type: 'string',
            enum: ['pending', 'running', 'completed'],
          },
          stageId: {
            type: 'string',
          },
          groupId: {
            type: 'string',
          },
          roundId: {
            type: 'string',
          },
          number: {
            type: 'string',
          },
          type: {
            type: 'string',
            enum: ['duel', 'ffa', 'bye'],
          },
          settings: {
            type: 'object',
          },
          playedAt: {
            type: 'string',
            nullable: true,
          },
          reportClosed: {
            type: 'boolean',
          },
          opponents: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: true,
            },
          },
          tournamentId: {
            type: 'string',
          },
        },
      },
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
