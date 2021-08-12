import { FastifyReply, FastifyRequest } from 'fastify';
import { getTournaments } from '../../lib/api/tournaments';

const schema = {
  description: 'Get tournaments',
  summary: '',
  tags: ['Tournaments'],
  // response: {
  //   200: {
  //     type: 'object',
  //     properties: {
  //       status: {
  //         type: 'string',
  //       },
  //       date: {
  //         type: 'string',
  //       },
  //     },
  //   },
  // },
};

const handler = async (req: FastifyRequest, reply: FastifyReply) => {
  const tournaments = await getTournaments();
  reply.send(tournaments);
};

export default async (fastify: any) => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler,
    schema,
  });
};
