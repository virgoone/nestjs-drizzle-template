import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { v4 as uuid } from 'uuid';
import { MulterModule } from '@nestjs/platform-express';
import configs from '@/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppInterceptor } from './app.interceptor';
import { InterceptorModule } from '@/interceptor/interceptor.module';

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
          const id = req.id || uuid();

          return id;
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
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: AppInterceptor },
    AppService,
  ],
})
export class AppModule {}
