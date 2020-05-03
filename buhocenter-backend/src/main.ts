import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { LoggerSettingsService } from './modules/settings/services/logger.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as rTracer from 'cls-rtracer';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'DELETE', 'POST'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  });

  app.use(rTracer.expressMiddleware());
  app.use(helmet());

  app.setGlobalPrefix('/api/v1');

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
