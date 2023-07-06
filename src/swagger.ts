import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const DOC_PATH = 'v1/documentation';

const TITLE = 'Документация для неофициального API кинопоиска (kinopoisk.dev).';
const SITE_TITLE = 'Документация: для неофициального kinopoisk api';

const DESCRIPTION = `
<h2>Важно: прочитайте документацию перед работой с API!</h2>
<p>Для корректной работы с API принимайте во внимание следующие рекомендации:
<ul>
  <li>Токен должен быть указан в <code>headers</code> под названием <code>X-API-KEY</code>.</li>
  <li>Воспользуйтесь возможностью формировать и тестировать запросы прямо в этой документации, используя функционал Swagger.</li>
  <li>Перед обращением в чат за помощью, попытайтесь самостоятельно разобраться в документации.</li>
</ul>
</p>

<p>API предоставляет максимум данных о фильмах, сериалах и персонах.</p>

<p>Если у вас еще нет токена, получите его в боте <a href="https://t.me/kinopoiskdev_bot">@kinopoiskdev_bot</a>.</p>

<p>Запросы к API могут включать фильтрацию по полям, которые могут принимать значение <code>!null</code>.</p>

<p>При отправке запросов с пагинацией вы можете составлять свои фильтры, позволяющие получить желаемый список фильмов.</p>

<p>Модель для запроса ипользует все значения как массив строк, чтобы составлять запросы учитывайте типы полей укажанные в модели ответа:</p>
<ul>
  <li><strong>Number:</strong> можно указать значение или диапазон значений, формат - "1-10".</li>
  <li><strong>Date:</strong> поддержка дат в формате "dd.mm.yyyy" или диапазона дат "dd.mm.yyyy-dd.mm.yyyy".</li>
  <li><strong>String:</strong> работа со строками, полное совпадение или регулярное выражение.</li>
</ul>

<p>По вопросам работы с API обращайтесь в чат <a href="https://t.me/dev_to_dev">@dev_to_dev</a>.</p>

<p>Если вы обнаружили ошибку или у вас есть предложения по улучшению, создавайте issue на <a href="https://github.com/mdwitr0/kinopoiskdev">GitHub</a>.</p>

<h3>Полезные ссылки:</h3>
<ul>
  <li><a href="https://github.com/OpenMovieDB/kinopoiskdev_client">JavaScript и TypeScript клиент</a></li>
  <li><a href="https://github.com/odi1n/kinopoisk_dev">Python клиент</a></li>
  <li><a href="/v1/documentation-json">OpenAPI Specification (JSON)</a></li>
  <li><a href="/v1/documentation-yaml">OpenAPI Specification (YAML)</a></li>
</ul>
`;

export const setupSwagger = (app: NestFastifyApplication) => {
  const config = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription(DESCRIPTION)
    .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'X-API-KEY')
    .setVersion('1.3')
    .addServer('https://api.kinopoisk.dev')
    .addServer('http://127.0.0.1:3000')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(DOC_PATH, app, document, {
    customSiteTitle: SITE_TITLE,
    customCssUrl: 'https://kinopoisk.dev/assets/swagger.css',
    customfavIcon: 'https://kinopoisk.dev/assets/icon.png',
  });
};
