import { version } from 'package.json'

import { registerAs } from '@nestjs/config'

export default registerAs(
  'app',
  (): Record<string, any> => ({
    serverUrl: process.env.SERVER_URL,
    clientUrl: process.env.CLIENT_URL,
    name: process.env.APP_NAME || 'Survey',
    env: process.env.APP_ENV,
    isDev: process.env.APP_ENV === 'development',
    version,

    versioning: {
      enable: process.env.HTTP_VERSIONING_ENABLE === 'true' ?? false,
      prefix: 'v',
      version: process.env.HTTP_VERSION ?? '1',
    },
  }),
)
