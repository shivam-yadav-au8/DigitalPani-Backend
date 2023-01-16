import { registerAs } from '@nestjs/config';
import 'dotenv/config';
export default registerAs('mongo', () => ({
  mongo_uri: process.env.MONOGODB_URI,
}));
