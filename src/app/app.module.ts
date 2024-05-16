import { LoggerModule } from 'nestjs-pino'
import { v4 as uuid } from 'uuid'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { MulterModule } from '@nestjs/platform-express'
import { TerminusModule } from '@nestjs/terminus'
import { ThrottlerModule } from '@nestjs/throttler'

import configs from '@/config'
import { HealthPublicController } from '@/health/controller/health.controller'
import { HealthModule } from '@/health/health.module'
import { InterceptorModule } from '@/interceptor/interceptor.module'

import { AppController } from './app.controller'
import { AppInterceptor } from './app.interceptor'
import { AppService } from './app.service'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.APP_ENV !== 'production' ? 'trace' : 'info',
        transport:
          process.env.APP_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  timestamp: true,
                  translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
                  ignore: 'context',
                },
              }
            : undefined,

        genReqId: (req: any) => {
          const id = req.id || uuid()

          return id
        },
      },
    }),
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      envFilePath: ['.env'],
      ignoreEnvFile: process.env.APP_ENV === 'production',
      expandVariables: true,
    }),

    // DBModule.forRootAsync({
    //   useFactory: (configService: ConfigService) =>
    //     configService.get('database.mongo'), // or use async method
    //   //useFactory: async (configService: ConfigService) => configService.get('redis'),
    //   inject: [ConfigService],
    // }),
    TerminusModule,
    InterceptorModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 10,
        },
      ],
    }),
    MulterModule.register(),
    HealthModule,
  ],
  controllers: [AppController, HealthPublicController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: AppInterceptor },
    AppService,
  ],
})
export class AppModule {}
