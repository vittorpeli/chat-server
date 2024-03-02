-- AlterTable
ALTER TABLE "User" ADD COLUMN "contacts" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "ownerId" INTEGER,
    CONSTRAINT "Room_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Room" ("description", "id", "ownerId", "title") SELECT "description", "id", "ownerId", "title" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE UNIQUE INDEX "Room_title_key" ON "Room"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
