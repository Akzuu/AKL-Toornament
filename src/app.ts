import { log } from './lib/log';
import initServer from './server';

module.exports = (async () => {
  try {
    const server = await initServer();
    await server.start();
  } catch (error) {
    log.error('Error starting server!', error);
    process.exit(1);
  }

  log.info('AKL-Toornament started successfully!');
})();
