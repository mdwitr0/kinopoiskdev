import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly configService: ConfigService,
  ) {}

  @Version('1')
  @Get()
  getHello(): { message: string } {
    return this.appService.getHello();
  }

  @Version('1')
  @Get('health')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('/v1.3/movie', `/v1.3/movie?limit=1&page=1`),
      () => this.http.pingCheck('/v1.3/movie/{id}', `/v1.3/movie/666`),
      () => this.http.pingCheck('/movie', `/movie?limit=1&page=1&token=${this.configService.get('DEFAULT_TOKEN')}`),
      () => this.http.pingCheck('/v1.3/movie/random', `/v1.3/movie/random`),
      () => this.http.pingCheck('/v1.2/movie/search', `/v1.2/movie/search?query=batman&limit=1&page=1`),
      () => this.http.pingCheck('/v1.1/movie/awards', `/v1.1/movie/awards?limit=1&page=1`),
      () =>
        this.http.pingCheck(
          '/v1/movie/possible-values-by-field',
          `/v1/movie/possible-values-by-field?field=genres.name`,
        ),
      () => this.http.pingCheck('/v1/season', `/v1/season?limit=1&page=1`),
      () => this.http.pingCheck('/v1/review', `/v1/review?limit=1&page=1`),
      () => this.http.pingCheck('/v1.2/person/search', `/v1.2/person/search?query=batman&limit=1&page=1`),
      () => this.http.pingCheck('/v1.1/person/awards', `/v1.1/person/awards?limit=1&page=1`),
      () => this.http.pingCheck('/v1/person', `/v1/person?limit=1&page=1`),
      () => this.http.pingCheck('/person', `/person?limit=1&page=1&token=${this.configService.get('DEFAULT_TOKEN')}`),
      () => this.http.pingCheck('/v1/person/{id}', `/v1/person/666`),
      () => this.http.pingCheck('/v1/studio', `/v1/studio?limit=1&page=1`),
      () => this.http.pingCheck('/v1/studio/{id}', `/v1/studio/666`),
      () => this.http.pingCheck('/v1/keyword', `/v1/keyword?limit=1&page=1`),
      () => this.http.pingCheck('/v1/image', `/v1/image?limit=1&page=1`),
      () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.8 }),
      () => this.memory.checkHeap('memory_heap', 500 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 500 * 1024 * 1024),
    ]);
  }
}
