import config from 'config';
import mongoose from 'mongoose';

const MONGO_URI: string = config.get('database.mongo.uri');
const MONGO_OPTIONS: object = config.get('database.mongo.options');

const start = async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
};

export default start;
