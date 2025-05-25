import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { collection, organization, reminder } from "./schema";

// Reminder Table:
export type GetReminders = InferSelectModel<typeof reminder>;
export type InsertReminder = InferInsertModel<typeof reminder>;

// Collection Table:
export type GetCollections = InferSelectModel<typeof collection>;
export type InsertCollection = InferInsertModel<typeof collection>;

// Organization Table:
export type GetOrganizations = InferSelectModel<typeof organization>;
export type InsertOrganization = InferInsertModel<typeof organization>;
