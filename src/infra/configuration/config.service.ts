import { get } from 'env-var';

import { Injectable } from '@nestjs/common';

import './dotenv';

@Injectable()
export class ConfigurationService {
  app: {
    nodeEnv: string;
    prefix: string;
    port: number;
  };

  database: {
    host: string;
    username: string;
    password: string;
    port: number;
    name: string;
  };

  constructor() {
    // Every method will be automatically called in order
    const methods = Object.getOwnPropertyNames(
      ConfigurationService.prototype,
    ).filter(
      (method) =>
        method !== 'constructor' && typeof this[method] === 'function',
    );

    for (const method of methods) {
      this[method]();
    }
  }

  private loadApp() {
    this.app = {
      nodeEnv: get('NODE_ENV').default('develop').asString(),
      prefix: 'api',
      port: get('APP_PORT').default('3000').asInt(),
    };
  }

  private loadDatabase() {
    this.database = {
      host: get('DB_HOST').required().asString(),
      username: get('DB_USERNAME').required().asString(),
      password: get('DB_PASSWORD').required().asString(),
      port: get('DB_PORT').required().asInt(),
      name: get('DB_NAME').required().asString(),
    };
  }
}
