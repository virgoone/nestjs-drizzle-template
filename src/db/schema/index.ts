import {
  integer,
  jsonb,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const User = pgTable('user', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 100 }),
  department: varchar('department', { length: 20 }),
  createTime: timestamp('create_time').defaultNow(),
  updateTime: timestamp('update_time').defaultNow(),
})
