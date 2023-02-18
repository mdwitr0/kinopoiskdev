import { ClassSerializerInterceptor, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyHelmet from '@fastify/helmet';
import compression from '@fastify/compress';
import { AppClusterService } from './app-cluster.service';

async function bootstrap() {
  const docGlobalPrefix = 'documentation';

  // Init logger
  const logger = new Logger('Main');
  // Init fastify adapter
  const adapter = new FastifyAdapter({
    trustProxy: true,
  });

  // Set global helmet
  adapter.register(fastifyHelmet, { global: true });
  // Set global gzip compression
  adapter.register(compression, {
    global: true,
    encodings: ['gzip', 'deflate'],
  });

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter, { bufferLogs: true });

  // Set global version
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Документация к для неофициального API кинопоиска (kinopoisk.dev).')
    .setDescription(
      `<p>API предоставляет максимальное количество информации о фильмах, сериалах, персонах и многом другом. </p>
      <p>Эта документация описывает только новые спосбобы взаимодействия с API, но так же api поддерживает полную обратную совместимость со старыми запросами.</p>
      <p>Чтобы начать использование API, вам необходимо получить токен в боте <a href="https://t.me/kinopoiskdev_bot">@kinopoiskdev_bot</a>. После получения доступа вы сможете использовать этот API для получения данных из сех методов в этой документации.</p>
      <p>Все поля в нашем API могут принимать значение <code>!null</code>. Это означает, что вы можете получить записи только тех объектов, у которых данные поля не пусты.</p>
      <p>При построении запросов к API обратите внимание на типы полей, такие как:</p>
      <ul>
        <li><strong>Number:</strong> поле принимает значения типа числа, вы можете передать конкретное значение или диапазон значений от 1 до 10, используя формат "1-10".</li>
        <li><strong>Date:</strong> поле принимает значения типа дата, вы можете передать конкретную дату в формате "dd.mm.yyyy" или диапазон дат в формате "dd.mm.yyyy-dd.mm.yyyy".</li>
        <li><strong>String:</strong> поле принимает значения типа строка, и вы можете искать ее с полным совпадением или с использованием регулярных выражений, в зависимости от назначения поля.</li>
      </ul>
      <p>Если у вас есть какие-либо вопросы, пожалуйста пишите в чат <a href="https://t.me/dev_to_dev">@dev_to_dev</a>.</p>
      <p>Если вы нашли баг, или хотете получить дополнительный функционал, пожалуйста создайте issue на github <a href="https://github.com/mdwitr0/kinopoiskdev_v1">kinopoiskdev</a>.</p>`,
    )
    .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'X-API-KEY')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(docGlobalPrefix, app, document);

  const port = process.env.PORT || 3111;
  const appEnv = process.env.APP_ENV;
  await app.listen(port);
  logger.log(`🚀 API app is running on: http://localhost:${port}/`);
  logger.log(`🌚 ENV: ${appEnv}`);
  logger.log(`📑 API Documentation is running on: http://localhost:${port}/${docGlobalPrefix}`);
}

AppClusterService.clusterize(bootstrap);
