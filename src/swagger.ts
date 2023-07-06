import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const DOC_PATH = 'v1/documentation';

const TITLE = 'Документация для неофициального API кинопоиска (kinopoisk.dev).';
const SITE_TITLE = 'Документация: для неофициального kinopoisk api';

const DESCRIPTION = `
<p><h2>Прочитай документацию, это важно!</h2></p>
<p>Обязательные условия для работы с этим API:
<ul>
  <li>Токен нужно указывать в <code>headers</code> как <code>X-API-KEY</code></li>
  <li>Любой запрос можно составить в документации и получить пример в формате curl. Чтобы составить запрос - нажимай на кнопки в интерфейсе, и посмотри что такое Swagger!</li>
  <li>Перед тем как пойти в чат и спросить "а как?", попробуй разобраться!</li>
  <li>Обращай внимания на параметры, которые принимает метод, и на особенности методов!</li>
</ul>
</p>
<p>API предоставляет максимальное количество информации о фильмах, сериалах, персонах и многом другом. </p>
<p>Эта документация интерактивна, а это значит, что прям в ней можно авторизоваться с токеном, сформировать запросы и получить пример валидного запроса. Все необходимые кнопки тут есть, просто проявите внимательность и смекалку.</p>
<p>Чтобы начать использование API, вам необходимо получить токен в боте <a href="https://t.me/kinopoiskdev_bot">@kinopoiskdev_bot</a>. После получения доступа вы сможете использовать этот API для получения данных из сех методов в этой документации.</p>
<p>Все поля в нашем API могут принимать значение <code>!null</code>. Это означает, что вы можете получить записи только тех объектов, у которых данные поля не пусты.</p>
<p>В запросах с пагинацией можно строить очень сложные запросы, для получения релевантной выдачи.</p>
<p>При построении запросов к API обратите внимание на типы полей, такие как:</p>
<ul>
  <li><strong>Number:</strong> поле принимает значения типа числа, вы можете передать конкретное значение или диапазон значений от 1 до 10, используя формат "1-10".</li>
  <li><strong>Date:</strong> поле принимает значения типа дата, вы можете передать конкретную дату в формате "dd.mm.yyyy" или диапазон дат в формате "dd.mm.yyyy-dd.mm.yyyy".</li>
  <li><strong>String:</strong> поле принимает значения типа строка, и вы можете искать ее с полным совпадением или с использованием регулярных выражений, в зависимости от назначения поля.</li>
</ul>
<p></p>
<p>Если у вас есть какие-либо вопросы, пожалуйста пишите в чат <a href="https://t.me/dev_to_dev">@dev_to_dev</a>.</p>
<p>Если вы нашли баг, или хотите получить дополнительный функционал, пожалуйста создайте issue на github <a href="https://github.com/mdwitr0/kinopoiskdev">kinopoiskdev</a>.</p>
<p>

Ссылки на спецификацию OpenAPI:
<ul>
  <li><a href="/v1/documentation-json">Documentation JSON</a></li>
  <li><a href="/v1/documentation-yaml">Documentation YAML</a></li>
</ul>
<br/>

Библиотеки для работы с API
<ul>
  <li><a href="https://github.com/OpenMovieDB/kinopoiskdev_client">Клиент для JavaScript и TypeScript</a></li>
  <li><a href="https://github.com/odi1n/kinopoisk_dev">Клиент для Python</a></li>
</ul>
<p>
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
