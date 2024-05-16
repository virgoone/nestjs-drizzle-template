import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'

import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestApplication } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { ENUM_APP_ENVIRONMENT } from '@/app/constants/app.enum.constant'

export default async function (app: NestApplication) {
  const configService = app.get(ConfigService)
  const env: string = configService.get<string>('app.env')
  const logger = new Logger()

  const docName: string = configService.get<string>('doc.name')
  const docDesc: string = configService.get<string>('doc.description')
  const docVersion: string = configService.get<string>('doc.version')
  const docPrefix: string = configService.get<string>('doc.prefix')
  console.log('env-->', env)
  if (env !== ENUM_APP_ENVIRONMENT.PRODUCTION) {
    const documentBuild = new DocumentBuilder()
      .setTitle(docName)
      .setDescription(docDesc)
      .setVersion(docVersion)
      .addServer('/')
      .addServer('http://dev.server:3000', 'dev server')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
        'Authorization',
      )
      .build()

    const document = SwaggerModule.createDocument(app, documentBuild, {
      deepScanRoutes: true,
    })

    const theme = new SwaggerTheme()
    SwaggerModule.setup('v3', app, document, {
      explorer: false,
      customSiteTitle: docName,
      customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
      swaggerOptions: {
        docExpansion: 'none',
        persistAuthorization: true,
        // displayOperationId: true,
        operationsSorter: 'alpha',
        tagsSorter: 'alpha',
        tryItOutEnabled: true,
        filter: true,
        deepLinking: true,
        syntaxHighlight: {
          activate: true,
          theme: 'tomorrow-night',
        },
      },
    })

    logger.log(`==========================================================`)

    logger.log(`Docs will serve on ${docPrefix}`, 'NestApplication')

    logger.log(`==========================================================`)
  }
}
