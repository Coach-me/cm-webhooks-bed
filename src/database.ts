import mongoose from 'mongoose';
import logging from './logging';

let database: mongoose.Connection;
export const connect = async (): Promise<void> => {
  // add your own uri below
  const uri =
    process.env.NODE_ENV === 'test'
      ? process.env.MONGO_TEST
      : process.env.MONGO;
  if (database) {
    return;
  }
  database = mongoose.connection;

  database.once('open', async () => {
    logging.info(`db connected --- ${uri}`);
  });
  database.on('error', (error) => {
    logging.error(error);
  });
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};
export const disconnectDatabase = async () => {
  if (!database) {
    return;
  }
  await mongoose.disconnect();
};

export const dropDatabase = async () => {
  if (!database) {
    return;
  }
  if (process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line no-restricted-syntax
    // await mongoose.connection.db.dropDatabase();
  }
};
