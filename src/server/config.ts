import * as dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const port = process.env.SERVER_PORT;

class Config {
  public environment = env;

  public port = port ? parseInt(port, 10) : 3200;
  public refreshTokenTimeout = process.env.REFRESH_TOKEN_TIMEOUT || '2 weeks';
  public logLevel = process.env.LOG_LEVEL || 'info';
  public showErrorCause: boolean = process.env.SHOW_ERROR_CAUSE === 'true';
  public sessionTimeout = process.env.SESSION_TIMEOUT || '20 minutes';
  public dbUrl =
    process.env.DB_URL || 'postgresql://postgres:postgres@localhost/postgres';
  public dbSSL: boolean = process.env.DB_SSL === 'true';

  public uploadPath: string = process.env.UPLOAD_PATH || './uploads';
}

export const config = new Config();
