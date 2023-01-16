import dotenv from 'dotenv';
import path from 'path';
type Environment = 'development' | 'test' | 'production';

class Env {
  // the file to be loaded in development environments
  dotEnvDefault = '.env';
  dotEnvTest = '.env.test';
  dotEnvDevelopment = '.env.development';
  dotEnvProduction = '.env.production';
  AWS_SDK_LOAD_CONFIG = 1;
  constructor() {
    // configure dotenv to resolve a file named ".env.dev"
    // found in the currrent working directory
    // and get the environment specified
    const environment = this.getEnvironment();
    // then load the name of the environment file
    const envFile = this.getEnvFile(environment);
    // and re-configure dotenv
    dotenv.config({
      path: path.resolve(process.cwd(), envFile),
    });
  }
  getEnvFile(environment: Environment): string {
    switch (environment) {
      case 'development':
        return this.dotEnvDevelopment;
      case 'test':
        return this.dotEnvTest;
      case 'production':
        return this.dotEnvProduction;
      default:
        return this.dotEnvDefault;
    }
  }
  // Get a value from the .env.* file
  getEnvironmentVariable(variable: string): string {
    return process.env[variable];
  }
  // Get the current environment. Can be null.
  getEnvironment(): Environment | null {
    return this.getEnvironmentVariable('NODE_ENV') as Environment;
  }

  isDevelopment() {
    return this.getEnvironment() === 'development';
  }
  isTest() {
    return this.getEnvironment() === 'test';
  }
}
const env = new Env();
export default env;
