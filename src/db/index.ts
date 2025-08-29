import {
  drizzle,
  type BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

export const db: BetterSQLite3Database<typeof schema> = drizzle(
  process.env.DB_FILE_NAME!
);
