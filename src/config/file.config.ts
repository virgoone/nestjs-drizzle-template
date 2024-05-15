import bytes from 'bytes'

import { registerAs } from '@nestjs/config'

// if we use was api gateway, there has limitation of the payload size
// the payload size 10mb
export default registerAs(
  'file',
  (): Record<string, any> => ({
    image: {
      maxFileSize: bytes('10mb'), // 10mb
      maxFiles: 3, // 3 files
    },
    excel: {
      maxFileSize: bytes('10mb'), // 10mb
      maxFiles: 1, // 1 files
    },
    audio: {
      maxFileSize: bytes('20mb'), // 20mb
      maxFiles: 1, // 1 files
    },
    video: {
      maxFileSize: bytes('100mb'), // 100mb
      maxFiles: 1, // 1 files
    },
  }),
)
