import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './app/all-exceptions.filter';
import * as rTracer from 'cls-rtracer';
import * as helmet from 'helmet';
import * as contextService from 'request-context';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.useGlobalFilters(app.get(AllExceptionsFilter));

    app.enableCors({
        origin: '*',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'DELETE', 'POST'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    });

    app.use(rTracer.expressMiddleware());
    app.use(helmet());
    app.use(contextService.middleware('request'));

    app.setGlobalPrefix('/api/v1');

    await app.listen(process.env.PORT);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
