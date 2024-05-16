import { DynamicModule, Module } from '@nestjs/common'

import { DBCoreModule } from './db-core.module'
import { DBModuleAsyncOptions, DBModuleOptions } from './interface/db.interface'

@Module({})
export class DBModule {
  static register(options: DBModuleOptions): DynamicModule {
    return {
      module: DBModule,
      imports: [DBCoreModule.register(options)],
    }
  }

  static forRootAsync(options: DBModuleAsyncOptions): DynamicModule {
    return {
      module: DBModule,
      imports: [DBCoreModule.forRootAsync(options)],
    }
  }
}
