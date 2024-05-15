import {
  DynamicModule,
  Global,
  Module,
  Inject,
  OnModuleDestroy,
} from '@nestjs/common';
import {
  DBModuleAsyncOptions,
  DBModuleOptions,
} from './interface/db.interface';
import { createAsyncClientOptions, createClient } from './db.provider';
import { Client } from 'pg';

import { DB_MODULE_OPTIONS, DB_CLIENT } from './constants';
import { DBService } from './service/db.service';

@Global()
@Module({
  providers: [DBService],
  exports: [DBService],
})
export class DBCoreModule implements OnModuleDestroy {
  constructor(
    @Inject(DB_MODULE_OPTIONS)
    private readonly options: DBModuleOptions,
    @Inject(DB_CLIENT)
    private readonly dbClient: Client,
  ) {}

  static register(options: DBModuleOptions): DynamicModule {
    return {
      module: DBCoreModule,
      providers: [
        createClient(),
        { provide: DB_MODULE_OPTIONS, useValue: options },
      ],
      exports: [DBService],
    };
  }

  static forRootAsync(options: DBModuleAsyncOptions): DynamicModule {
    return {
      module: DBCoreModule,
      imports: options.imports,
      providers: [createClient(), createAsyncClientOptions(options)],
      exports: [DBService],
    };
  }

  onModuleDestroy() {
    const closeConnection = (client: Client) => async (options) => {
      if (client && !options.keepAlive) {
        await client.end();
      }
    };

    const closeClientConnection = closeConnection(this.dbClient);

    closeClientConnection(this.options);
  }
}
