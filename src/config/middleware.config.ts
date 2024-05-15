import ms from 'ms'

import { registerAs } from '@nestjs/config'

export default registerAs(
  'middleware',
  (): Record<string, any> => ({
    cors: {
      allowMethod: ['GET', 'HEAD', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
      allowHeader: [
        'Accept',
        'Accept-Language',
        'Content-Language',
        'Content-Type',
        'Origin',
        'Authorization',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Methods',
        'Access-Control-Allow-Credentials',
        'Access-Control-Expose-Headers',
        'Access-Control-Max-Age',
        'Referer',
        'Host',
        'X-Requested-With',
        'x-custom-lang',
        'x-timestamp',
        'x-api-key',
        'x-timezone',
        'x-request-id',
        'x-server-version',
        'X-Response-Time',
        'x-app-id',
        'x-device-id',
        'x-login-id',
        'x-token',
        'x-api-token',
        'x-session',
        'x-fc-request-id',
        'x-city-code',
      ],
    },
    timestamp: {
      toleranceTimeInMs: ms(process.env.MIDDLEWARE_TIMESTAMP_TOLERANCE || '5m'), // 5 mins
    },
    cache: {
      ttl: ms('30s'), // 30sec
      max: 100, // maximum number of items in cache,
    },
    timeout: {
      in: ms(process.env.MIDDLEWARE_TIMEOUT || '30s'), // 30s based on ms module
    },
    userAgent: {
      os: ['Mobile', 'Mac OS', 'Windows', 'UNIX', 'Linux', 'iOS', 'Android'],
      browser: [
        'IE',
        'Safari',
        'Edge',
        'Opera',
        'Chrome',
        'Firefox',
        'Samsung Browser',
        'UCBrowser',
      ],
    },
  }),
)
