"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { fileEntries } from "../schema";

export async function setEntryStatus({
  id,
  status,
}: {
  id: number;
  status: number;
}) {
  const updatedFileEntry = {
    id,
    status,
  };

  await db
    .update(fileEntries)
    .set(updatedFileEntry)
    .where(eq(fileEntries.id, id))
    .run();
}
