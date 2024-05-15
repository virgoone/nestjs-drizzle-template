import { registerAs } from '@nestjs/config'

export default registerAs(
  'database',
  (): Record<string, any> => ({
    pg: {
      url: process.env.DB_URL,
    },
  }),
)
