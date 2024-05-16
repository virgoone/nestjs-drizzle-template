import * as assert from 'node:assert'
import { Client } from 'pg'

import { Provider } from '@nestjs/common'

import { DB_CLIENT, DB_MODULE_OPTIONS } from './constants'
import { DBModuleAsyncOptions, DBModuleOptions } from './interface/db.interface'

async function getClient(options: DBModuleOptions): Promise<Client> {
  const { url, ...opt } = options
  assert.ok(url, 'DATABASE_URL is required')
  let _client = new Client({ connectionString: url, ...opt })
  try {
    await _client.connect()
    console.log('Connected to system database')
    return _client
  } catch (err) {
    console.error('Failed to connect to system database')
    console.error(err)
    process.exit(1)
  }
}

export const createClient = (): Provider => ({
  provide: DB_CLIENT,
  useFactory: async (options: DBModuleOptions): Promise<Client> => {
    const client = await getClient(options)
    return client
  },
  inject: [DB_MODULE_OPTIONS],
})

export const createAsyncClientOptions = (options: DBModuleAsyncOptions) => ({
  provide: DB_MODULE_OPTIONS,
  useFactory: options.useFactory,
  inject: options.inject,
})
