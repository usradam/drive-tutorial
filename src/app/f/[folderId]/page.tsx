import { db } from "~/server/db"
import { files as filesScehma, folders as foldersScehma } from "~/server/db/schema"
import DriveContents from "../../drive-contents"
import { z } from "zod"
import { eq } from "drizzle-orm"

export default async function GoogleDriveClone(props: {
    params: Promise<{ folderId: string }>
}) {
    const params = await props.params;

    const parsedFolderId = parseInt(params.folderId);
    if (isNaN(parsedFolderId)) {
        return <div>Invalid folder ID</div>;
    }

    const folders = await db
        .select()
        .from(foldersScehma)
        .where(eq(foldersScehma.parent, parsedFolderId));
    
    const files = await db
        .select()
        .from(filesScehma)
        .where(eq(filesScehma.parent, parsedFolderId));
    
    return <DriveContents files={files} folders={folders} />
}

