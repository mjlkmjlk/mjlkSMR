import {
  sqliteTable,
  integer,
  text,
  primaryKey,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("tProjects", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().unique(),
  projectPath: text("project_path").notNull().unique(),
});
export type ProjectsType = typeof projects.$inferSelect;

export const fileEntries = sqliteTable(
  "tFileEntries",
  {
    id: integer("id").primaryKey(),
    guid: text("guid").notNull().unique(),
    filePath: text("file_path").notNull(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    status: integer("status").notNull().default(0),
  },
  (t) => [
    uniqueIndex("guid_idx").on(t.guid),
    index("file_entries_project_id_idx").on(t.projectId),
  ]
);
export type FileEntriesType = typeof fileEntries.$inferSelect;

export const fileRelations = sqliteTable(
  "tFileRelations",
  {
    key1: integer("key1")
      .notNull()
      .references(() => fileEntries.id, { onDelete: "cascade" }),
    key2: integer("key2")
      .notNull()
      .references(() => fileEntries.id, { onDelete: "cascade" }),
    result: integer("result"),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
  },
  (t) => [
    primaryKey({ columns: [t.key1, t.key2] }),
    index("file_relations_project_id_idx").on(t.projectId),
    index("idx_key1").on(t.key1),
    index("idx_key2").on(t.key2),
    index("idx_project_key_pair").on(t.projectId, t.key1, t.key2),
  ]
);
export type FileRelationsType = typeof fileRelations.$inferSelect;
