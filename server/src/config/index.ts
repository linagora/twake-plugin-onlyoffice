import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
export const { NODE_ENV, PORT, SECRET_KEY, TWAKE_API, ONLY_OFFICE_SERVER } = process.env;
