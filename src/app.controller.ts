import { Controller, Get } from '@nestjs/common';
import { DiskHealthIndicator, HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
  ) {}

  @Get('health')
  @HealthCheck()
  @ApiExcludeEndpoint()
  check() {
    return this.health.check([
      () => this.http.pingCheck('/v1', `/v1`),
      () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.8 }),
      () => this.memory.checkHeap('memory_heap', 500 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 500 * 1024 * 1024),
    ]);
  }
}
