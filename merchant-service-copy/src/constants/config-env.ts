import * as dotenv from 'dotenv';
dotenv.config();

// const NEED_TO_CONFIGURED = 'NEED TO CONFIGURED';

// environment
export const ENVIRONMENT: string = process.env.ENVIRONMENT || 'local';

export const URL_PREFIX: string = process.env.URL_PREFIX || '/api';
export const SECRET_CRONJOB: string = process.env.SECRET_CRONJOB || '27dfa083-4675-4aae-88f5-194054da69f6';

//token
export const ACCESS_TOKEN_EXPIRE_TIME = process.env.ACCESS_TOKEN_EXPIRE_TIME || '30d';
export const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY || '5239955f-4e01-4873-aca9-5183816ae4a9 ';

// application
export const SERVER_PORT: number = +process.env.SERVER_PORT || 3000;
export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/';
export const SECRET_KEY_SEND_GMAIL = process.env.SECRET_KEY_SEND_GMAIL || '57ec1978-ddad-48b6-8db7-88123a8da5c2';
export const OTP_TIME_EXPIRE = +process.env.OTP_TIME_EXPIRE || 300;

// AWS
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || 'AWS_ACCESS_KEY_ID';
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || 'AWS_SECRET_ACCESS_KEY';
export const AWS_BUCKET = process.env.AWS_BUCKET || 'AWS_BUCKET';
export const S3_REGION = process.env.S3_REGION || 'S3_REGION';

// Postgresql
export const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
export const POSTGRES_PORT = +process.env.POSTGRES_PORT || 5432;
export const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME || 'postgres';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'password';
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || 'base';

// Mysql
export const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
export const MYSQL_PORT = +process.env.MYSQL_PORT || 3306;
export const MYSQL_USERNAME = process.env.MYSQL_USERNAME || 'mysql';
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'password';
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'base';

// Redis
export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = +process.env.REDIS_PORT || 6379;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';
export const REDIS_DB = +process.env.REDIS_DB || 0;
export const PREFIX_KEY = process.env.PREFIX_KEY || '';

// Send-email
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'example@adamosoft.com';
export const ADMIN_PASSWORD_EMAIL = process.env.ADMIN_PASSWORD_EMAIL || 'abc+=123';
export const ADMIN_EMAIL_NAME = process.env.ADMIN_EMAIL_NAME || 'abc+=123';
