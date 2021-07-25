import * as dotenv from 'dotenv';

dotenv.config();

export const userKey = process.env.GIF_AUTH_KEY ?? '';
