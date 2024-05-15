import { Module } from '@nestjs/common'
import { BucketModule } from '@/bucket/bucket.module'
import { BucketHealthIndicator } from './indicators/health.bucket.indicator'

@Module({
  providers: [BucketHealthIndicator],
  exports: [BucketHealthIndicator],
  imports: [BucketModule],
})
export class HealthModule {}
