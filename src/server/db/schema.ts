import { relations, sql } from "drizzle-orm";
import { index, pgTableCreator, uniqueIndex } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `reminder_${name}`);

// Organization table
export const organization = createTable(
  "organization",
  (d) => ({
    id: d.uuid().primaryKey(),
    name: d.text().notNull(),
    createdBy: d.text().notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("name_idx").on(t.name),
    uniqueIndex("organization_name_userid_unique_idx").on(t.name, t.createdBy),
  ],
);

// Collection table
export const collection = createTable("collection", (d) => ({
  id: d.uuid().primaryKey(),
  name: d.text().notNull(),
  colors: d.text(),
  createdBy: d.text().notNull(),
  organizationId: d
    .uuid()
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
}));

// Reminder table
export const reminder = createTable("reminder", (d) => ({
  id: d.uuid().primaryKey(),
  title: d.text().notNull(),
  description: d.text(),
  date: d.timestamp({ withTimezone: true }),
  collectionId: d
    .uuid()
    .notNull()
    .references(() => collection.id, { onDelete: "cascade" }),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  createdBy: d.text().notNull(),
}));

// Relations
export const organizationRelations = relations(organization, ({ many }) => ({
  collections: many(collection),
}));

export const collectionRelations = relations(collection, ({ one, many }) => ({
  organization: one(organization, {
    fields: [collection.organizationId],
    references: [organization.id],
  }),
  reminders: many(reminder),
}));

export const reminderRelations = relations(reminder, ({ one }) => ({
  collection: one(collection, {
    fields: [reminder.collectionId],
    references: [collection.id],
  }),
}));
