<p align="center">
  <a href="https://kinopoisk.dev/" target="blank"><img src="https://openmovieapi.dev/full-size-cover.png" alt="Open movie API logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
# Неофициальное API кinopoisk.dev

API предоставляет максимальное количество информации о фильмах, сериалах, персонах и многом другом. Все данные, предоставляемые через kinopoisk.dev, собраны из открытых источников и не нарушают прав КиноПоиска.

## Доступ к API

Чтобы начать использование API, вам необходимо получить токен в боте <a href="https://t.me/kinopoiskdev_bot">@kinopoiskdev_bot</a>.

## Использование

Чтобы использовать Kinopoisk.dev API, отправьте GET запрос на один из конечных точек API, используя ваш API ключ. Например:
```bash
$ curl -X 'GET' \
  'https://test-api.kinopoisk.dev/movie/{movie_id}' \
  -H 'accept: application/json' \
  -H 'X-API-KEY: <ваш API ключ>'
```
Замените `{movie_id}` на идентификатор фильма, который вы хотите получить. Вы получите ответ в формате JSON, содержащий информацию о фильме.
## Документация

Подробную документацию о том, как использовать Kinopoisk.dev API, можно найти на [сайте документации](https://test-api.kinopoisk.dev/documentation).

## Лицензия

Kinopoisk.dev API находится под лицензией [MIT](LICENSE).

## Отказ от ответственности

Kinopoisk.dev - это неофициальный сервис и не имеет никакого отношения к КиноПоиску. Все данные, предоставляемые через это API, собраны из открытых источников и не нарушают прав КиноПоиска. Авторы сервиса не несут ответственности за любой ущерб, который может быть причинен в результате использования данного API.

Если у вас есть какие-либо вопросы или предложения, пожалуйста, свяжитесь с нами.