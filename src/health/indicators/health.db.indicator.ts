import { sql } from 'drizzle-orm'

import { Injectable } from '@nestjs/common'
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus'

import { DBService } from '@/db/service/db.service'

@Injectable()
export class DBHealthIndicator extends HealthIndicator {
  constructor(private readonly dbService: DBService) {
    super()
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.dbService.db.execute(sql`select 1`)
      return this.getStatus(key, true)
    } catch (error) {
      throw new HealthCheckError(
        'DBHealthIndicator failed',
        this.getStatus(key, false),
      )
    }
  }
}
