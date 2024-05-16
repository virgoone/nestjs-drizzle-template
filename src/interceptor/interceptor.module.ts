import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { HttpInterceptorService } from './http-interceptor.service'

@Module({
  imports: [HttpModule],
  providers: [HttpInterceptorService],
  exports: [HttpInterceptorService],
})
export class InterceptorModule {}
