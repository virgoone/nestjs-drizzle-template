import * as path from 'path'

const moduleAlias = require('module-alias')

const resolve = (resolvePath: string): string =>
  path.resolve(__dirname, '../', resolvePath)
// Or multiple aliases
moduleAlias.addAliases({
  '@': resolve('.'),
})

moduleAlias()
