import { NestFactory } from '@nestjs/core';
import { AppConfigService } from './config/app/config.service';
import { AppModule } from './app.module';
import { redis_connection } from './redis';
async function main() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);

  const whitelist = [
    'http://localhost:3000',
    'https://localhost:3000',
    'https://1c8c-2401-4900-5d99-7f89-bdd9-4844-aa3f-bb03.in.ngrok.io',
    'https://1c8c-2401-4900-5d99-7f89-bdd9-4844-aa3f-bb03.in.ngrok.io/auth/register',
  ];
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  app.listen(appConfig.port);
  // redis_connection();
}

main();
