import { Client } from 'pg'

import { Inject, Injectable } from '@nestjs/common'

import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'

import { DB_CLIENT } from '../constants'

@Injectable()
export class DBService {
  constructor(@Inject(DB_CLIENT) private readonly dbClient: Client) {}

  getClient(): Client {
    return this.dbClient
  }

  get db(): NodePgDatabase {
    return drizzle(this.getClient())
  }
}
