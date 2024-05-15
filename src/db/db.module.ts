import { DynamicModule, Module } from '@nestjs/common';
import { DBModuleAsyncOptions, DBModuleOptions } from './interface/db.interface';

import { DBCoreModule } from './db-core.module';

@Module({})
export class DBModule {
  static register(options: DBModuleOptions): DynamicModule {
    return {
      module: DBModule,
      imports: [DBCoreModule.register(options)],
    };
  }

  static forRootAsync(options: DBModuleAsyncOptions): DynamicModule {
    return {
      module: DBModule,
      imports: [DBCoreModule.forRootAsync(options)],
    };
  }
}
