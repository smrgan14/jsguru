const env = {
  port: process.env.SERVER_PORT,
  nodeEnv: process.env.NODE_ENV,
  mongoDbUri: process.env.MONGO_DB_URI,
  mongoDatabase: process.env.MONGO_DB,
  baseUrl: process.env.BASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION,
  },
};

export default env;
