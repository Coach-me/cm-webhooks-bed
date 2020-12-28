import app from './app';
import logging from './logging';
import { connect } from './database';

require('dotenv-safe').config();

connect().then(async () => {
  const appInstance = await app();
  appInstance.listen(process.env.PORT, async () => {
    logging.info(
      `🚀🚀 STARTED ENV=${process.env.NODE_ENV} PORT=${process.env.PORT} 🚀🚀`
    );
  });
});
