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
  organizationId: d
    .uuid()
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
}));

// Organization & Collection Relations
export const organizationRelations = relations(organization, ({ many }) => ({
  collections: many(collection),
}));

export const collectionRelations = relations(collection, ({ one }) => ({
  organization: one(organization, {
    fields: [collection.organizationId],
    references: [organization.id],
  }),
}));
