import {
  drizzle,
  type BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
/* 
const sqlite = new Database(process.env.DB_FILE_NAME);
sqlite.pragma("foreign_keys = ON");

export const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, {
  schema,
});

migrate(db, { migrationsFolder: "drizzle" }); */
export const db: BetterSQLite3Database<typeof schema> = drizzle(
  process.env.DB_FILE_NAME!
);
