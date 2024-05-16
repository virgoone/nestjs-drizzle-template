import './utils/alias'

import compression from 'compression'
import * as helmet from 'helmet'
import { Logger as MyLogger } from 'nestjs-pino'

import {
  Logger,
  NestApplicationOptions,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestApplication, NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app/app.module'
import swaggerInit from './swagger'

async function bootstrap() {
  const appOptions: NestApplicationOptions = {
    bufferLogs: true,
  }
  // if (process.env.APP_ENV !== 'production') {
  //   const httpsOptions = {
  //     key: fs.readFileSync(`/Users/koya/.lark/0.0.0.0-key.pem`),
  //     cert: fs.readFileSync(`/Users/koya/.lark/0.0.0.0-cert.pem`),
  //   }
  //   appOptions.httpsOptions = httpsOptions
  // }
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    appOptions,
  )
  const configService = app.get(ConfigService)
  const env: string = configService.get<string>('app.env')
  const proxy: boolean = configService.get<boolean>('app.proxy')

  app.enableCors()
  const logger = new Logger()
  app.set('trust proxy', proxy)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )

  app.enableVersioning({
    defaultVersion: ['1'],
    type: VersioningType.URI,
  })

  app.use(compression())
  app.use(helmet.hidePoweredBy())
  app.useLogger(app.get(MyLogger))

  // Swagger
  await swaggerInit(app as unknown as NestApplication)

  await app.listen(8080)

  logger.log(`==========================================================`)
  logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication')
  // logger.log(`Https Server running on https://0.0.0.0:${10443}`, 'NestApplication')
  logger.log(`Environment: ${env}`, 'NestApplication')
  logger.log(`==========================================================`)
}
bootstrap()
