import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';

export const DOC_PATH = '/documentation';

const TITLE = 'Документация для неофициального API кинопоиска (kinopoisk.dev).';
const SITE_TITLE = 'Документация: для неофициального kinopoisk api';

const DESCRIPTION = `
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js", "ym");

   ym(62307766, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/62307766" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
<p>Через этот API вы можете получить практически все данные из кинопоиска. Больше информации вы можете получить изучив эту документацию.</p>
<h2>Как работать с документацией?</h2>
<p>
Для начала работы с API вам необходимо получить токен, который вы можете получить в боте <a href="https://t.me/kinopoiskdev_bot">@kinopoiskdev_bot</a>. <br />
После получения токена, вам необходимо авторизоваться в документации, для этого нажмите на кнопку <strong>Authorize</strong> и введите токен в поле <strong>Value</strong>.<br />
После авторизации вы можете отправлять запросы к API, для этого нажмите на кнопку <strong>Try it out</strong> и заполните необходимые поля для составления нужного фильтра.<br />
После заполнения полей нажмите на кнопку <strong>Execute</strong> и получите ответ от API и пример запроса.
</p>
<h3>Как работать с API?</h3>
<p>
API работает по принципу REST, все запросы отправляются на адрес <code>https://api.kinopoisk.dev/</code> с указанием версии API и необходимого ресурса.<br />
Все запросы к API кинопоиска должны содержать заголовок <code>X-API-KEY</code> с вашим токеном. В противном случае вы получите ошибку <code>401</code>.<br />
При составлении запроса учитывайте, что все параметры должны быть в <code>query</code> и <code>path</code>. В зависимости от метода который вы используете.
Например, вы хотите получить список фильмов за 2023 год в жанре <code>криминал</code>, тогда ваш запрос будет выглядеть так: <code>https://api.kinopoisk.dev/v1.4/movie?year=2023&genres.name=криминал</code>.
Или вы хотите получить список фильмов с рейтингом выше 8, тогда ваш запрос будет выглядеть так: <code>https://api.kinopoisk.dev/v1.4/movie?rating.imdb=8-10</code>.
Документация kinopoisk api может помочь вам составить нужный запрос, для этого воспользуйтесь ее конструктором.
</p>
<h3>Особенности синтекса query параметров</h3>
<p>
Ключи в query параметрах имеют разные типы значений. В зависимости от типа значения, вы можете использовать разные операторы для фильтрации для поиска максимально релевантного фильма, сериала и т.д. в базе. <br />
Поля с типом <code>Number</code> могут принимать значения в форматах: <code>rating.kp=1-10</code>, <code>rating.kp=1</code>, <code>year=2022&year=2023</code>. <br />
Поля с типом <code>Date</code> могут принимать значения в форматах: <code>premiere.russia=dd.mm.yyyy-dd.mm.yyyy</code>, <code>premiere.russia=dd.mm.yyyy</code>. <br />
Поля с типом <code>String</code> могут принимать значения в форматах: <code>genres.name=драма</code>, <code>genres.name=криминал</code>, <code>genres.name=криминал&genres.name=драма</code> <br/>
Поля с типом <code>Boolean</code> могут принимать значения в форматах: <code>isSerial=true</code>, <code>isSerial=false</code>. <br />
Параметры жанров и стран могут принимать операторы <code>+</code> и <code>!</code>, для указания включаемых и исключаемых значений. Например, вы хотите получить список фильмов в жанрах <code>драма</code> и <code>криминал</code>, тогда ваш запрос будет выглядеть так: <code>genres.name=+драма&genres.name=+криминал</code>. Или вы хотите получить список фильмов с жанром <code>драма</code> и без жанра <code>криминал</code>, тогда ваш запрос будет выглядеть так: <code>genres.name=+драма&genres.name=!криминал</code>. <br />
</p>
<p>
Расшифровка операторов:
<ul>
  <li><code>!</code> - исключить.</li>
  <li><code>+</code> - включить.</li>
  <li><code>-</code> - диапазон значений, используется в качестве разделителя.</li>
</ul>
</p>

<p>По вопросам работы с API обращайтесь в чат <a href="https://t.me/+jeHPZVXiLPFhODJi">Developer Community KinopoiskDev</a>.</p>

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
    .setVersion('1.4');

  if (['production', 'prod', 'sync'].includes(process.env.NODE_ENV)) {
    config.addServer('https://api.kinopoisk.dev');
  } else {
    config.addServer('https://dev-api.kinopoisk.dev');
    config.addServer('http://127.0.0.1:3000');
  }

  const docConfig = config.build();

  const document = SwaggerModule.createDocument(app, docConfig);

  SwaggerModule.setup(DOC_PATH, app, document, {
    customSiteTitle: SITE_TITLE,
    customCssUrl: '/swagger.css',
    customfavIcon: '/icon.png',
  });
};
