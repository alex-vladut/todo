import auth from './auth.config';
import database from './database.config';

const general = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
});

export const configurations = [general, auth, database];
