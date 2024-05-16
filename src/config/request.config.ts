import bytes from 'bytes'
import ms from 'ms'

import { registerAs } from '@nestjs/config'

import { seconds } from '@/utils/time'

export default registerAs(
  'request',
  (): Record<string, any> => ({
    json: {
      maxFileSize: bytes('100kb'), // 100kb
    },
    raw: {
      maxFileSize: bytes('5mb'), // 5mb
    },
    text: {
      maxFileSize: bytes('100kb'), // 100kb
    },
    urlencoded: {
      maxFileSize: bytes('100kb'), // 100kb
    },
    timeout: ms('30s'), // 30s based on ms module
    url: process.env.HTTP_INTERCEPTOR_URL,
    throttle: {
      ttl: seconds('500'), // 0.5 secs
      limit: 10, // max request per reset time
    },
  }),
)
