import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { setupSwagger } from './swagger';
import { setupFastify } from './fastify';
import { statusAppMessage } from './common/utils/status-app-message.util';
import { HyperDXNestLoggerModule } from '@hyperdx/node-logger';

async function bootstrap(isSync = false) {
  const { PORT, HYPERDX_API_KEY, HYPERDX_API_URL } = process.env;

  const adapter = setupFastify();

  const app = await NestFactory.create<NestFastifyApplication>(AppModule.createSyncSpecificModule(isSync), adapter, {
    logger: HyperDXNestLoggerModule.createLogger({
      apiKey: HYPERDX_API_KEY,
      service: 'kinopoisk-api',
      baseUrl: HYPERDX_API_URL,
    }),
  });

  app.enableVersioning();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        excludePrefixes: ['undefined', 'NaN'],
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  setupSwagger(app);

  await app.listen(PORT || 3000, '0.0.0.0');

  statusAppMessage(app, isSync);
}

const isSyncNode = ['sync', 'development'].includes(process.env.NODE_ENV);
if (isSyncNode) {
  bootstrap(true);
} else {
  bootstrap();
}
