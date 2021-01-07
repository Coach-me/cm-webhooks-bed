import { connect, disconnectDatabase, dropDatabase } from '../../database';

module.exports = async () => {
  await connect();
  await dropDatabase();
  await disconnectDatabase();
};
