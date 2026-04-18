import * as dotenv from 'dotenv';
import { mkdirSync } from 'fs';
import * as path from 'path';
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const port = process.env.SERVER_PORT;

const uploadPath = process.env.UPLOAD_PATH || './upload';

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

  public uploadPath: string = uploadPath;
  public itemImagesPath: string = path.join(uploadPath, 'items');
  public staticPath: string = process.env.STATIC_PATH || 'public';
}

export const config = new Config();

mkdirSync(config.itemImagesPath, { recursive: true });
