import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string } {
    return { message: 'Ты как сюда попал? Смотри документацию https://api.kinopoisk.dev/v1/documentation' };
  }
}
