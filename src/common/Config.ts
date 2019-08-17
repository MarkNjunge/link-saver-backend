import * as dotenv from "dotenv";
dotenv.config();
import * as configPackage from "config";

interface Config {
  env: string;
  port: number;
  apiKey: string;
  dbUrl: string;
  dbExtraConfig: object;
  dbSSL: string;
}

export const config: Config = configPackage;
