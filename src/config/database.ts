import mongoose from 'mongoose';
import env from './env';
import { Context, Logger } from '../utils/logger';

const logger = new Logger(Context.SERVER);

export async function dbConnection() {
  try {
    const mongoUri = env.mongoDbUri || 'mongodb://localhost:27017/jsguru';
    await mongoose.connect(mongoUri, {
      autoIndex: true,
    });
    logger.info('Connected to jsguru database');
  } catch (error) {
    logger.error('Error in mongo connection');
  }
}
