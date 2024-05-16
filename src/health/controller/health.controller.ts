import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus'

// import { DatabaseConnection } from '@/database/decorators/database.decorator'
import { HealthSerialization } from '@/health/serializations/health.serialization'
import { ApiResponseObject, ResponseUtil } from '@/utils/response'

@ApiTags('健康检查')
@Controller({
  version: VERSION_NEUTRAL,
  path: '/health',
})
@ApiBearerAuth('Authorization')
export class HealthPublicController {
  constructor(
    // @DatabaseConnection() private readonly databaseConnection: Connection,
    private readonly health: HealthCheckService,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    private readonly diskHealthIndicator: DiskHealthIndicator,
  ) {}

  // @HealthCheckDoc()
  // @Response('health.check', { classSerialization: HealthSerialization })
  // @HealthCheck()
  // @Get('/database')
  // async checkDatabase(): Promise<IResponse> {
  //   const data = await this.health.check([
  //     () =>
  //       this.mongooseIndicator.pingCheck('database', {
  //         connection: this.databaseConnection,
  //       }),
  //   ])

  //   return {
  //     data,
  //   }
  // }

  @ApiOperation({ summary: 'Get memory heap status' })
  @ApiResponseObject(HealthSerialization)
  @HealthCheck()
  @Get('/memory-heap')
  async checkMemoryHeap() {
    const data = await this.health.check([
      () =>
        this.memoryHealthIndicator.checkHeap('memoryHeap', 300 * 1024 * 1024),
    ])

    return ResponseUtil.ok(data)
  }

  @ApiOperation({ summary: 'Get memory rss status' })
  @ApiResponseObject(HealthSerialization)
  @HealthCheck()
  @Get('/memory-rss')
  async checkMemoryRss() {
    const data = await this.health.check([
      () => this.memoryHealthIndicator.checkRSS('memoryRss', 300 * 1024 * 1024),
    ])

    return ResponseUtil.ok(data)
  }

  @ApiOperation({ summary: 'Get storage status' })
  @ApiResponseObject(HealthSerialization)
  @HealthCheck()
  @Get('/storage')
  async checkStorage() {
    const data = await this.health.check([
      () =>
        this.diskHealthIndicator.checkStorage('diskHealth', {
          thresholdPercent: 0.75,
          path: '/',
        }),
    ])

    return ResponseUtil.ok(data)
  }
}
