FROM node:18 AS production

# Установка зависимостей
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --production --frozen-lockfile

EXPOSE 3111

# Копирование исходных файлов
COPY . .

RUN apt-get -q update && apt-get -qy install netcat

# Сборка приложения
RUN yarn build

# Запуск приложения
CMD ["sh", "-c", "yarn start:prod"]