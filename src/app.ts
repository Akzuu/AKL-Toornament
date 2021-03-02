import initServer from './server';
import { mongoStart } from './database';
import { log } from './lib';

module.exports = (async () => {
  // Initialize database connection
  try {
    await mongoStart();
  } catch (error) {
    log.error('Error starting database!', error);
    process.exit(1);
  }

  // Start server
  try {
    const server = await initServer();
    await server.start();
  } catch (error) {
    log.error('Error starting server!', error);
    process.exit(1);
  }

  log.info('AKL-Toornament started successfully!');
})();
