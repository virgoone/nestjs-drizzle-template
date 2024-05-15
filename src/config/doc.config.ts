import { registerAs } from '@nestjs/config'

export default registerAs(
  'doc',
  (): Record<string, any> => ({
    name: `${process.env.APP_NAME ?? 'Survey'} APIs Specification`,
    description: 'Section for describe whole APIs',
    version: '1.0',
    prefix: '/',
  }),
)
