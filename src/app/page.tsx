import { db } from "~/server/db"
import { files as filesScehma, folders as foldersScehma } from "~/server/db/schema"
import DriveContents from "./drive-contents"

export default async function GoogleDriveClone() {
  const files = await db.select().from(filesScehma);
  const folders = await db.select().from(foldersScehma);
  return <DriveContents files={files} folders={folders} />
}

