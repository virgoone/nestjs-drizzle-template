import { ConnectionConfig } from 'pg'

import { ModuleMetadata } from '@nestjs/common/interfaces'

export interface DBModuleOptions extends ConnectionConfig {
  url: string
}

export interface DBModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => DBModuleOptions | Promise<DBModuleOptions>
  inject?: any[]
}
