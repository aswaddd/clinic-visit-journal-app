import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const visits = sqliteTable('visits', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  dateTime: text('date_time').notNull(),
  location: text('location').notNull(),
  doctor: text('doctor').notNull(),
  prescription: text('prescription').notNull(),
  diagnosis: text('diagnosis').notNull(),
  doctorNote: text('doctor_note').notNull(),
  personalNote: text('personal_note').notNull(),
  nextVisit: text('next_visit').notNull(),
});

export type Visit = typeof visits.$inferSelect;