import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const DOC_PATH = 'v1/documentation';

const TITLE = 'Документация для неофициального API кинопоиска (kinopoisk.dev).';
const SITE_TITLE = 'Документация: для неофициального kinopoisk api';

const DESCRIPTION = `<p>API предоставляет максимальное количество информации о фильмах, сериалах, персонах и многом другом. </p>
<p>Эта документация описывает только новые способы взаимодействия с API, но так же api поддерживает полную обратную совместимость со старыми запросами.</p>
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
`;

export const setupSwagger = (app: NestFastifyApplication) => {
  const config = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription(DESCRIPTION)
    .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'X-API-KEY')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(DOC_PATH, app, document, {
    customSiteTitle: SITE_TITLE,
    customCssUrl: '/swagger.css',
    customfavIcon: '/icon.png',
  });
};
