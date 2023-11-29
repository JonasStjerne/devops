/*
  Warnings:

  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accountOwnerId" INTEGER NOT NULL,
    "IBAN" INTEGER NOT NULL,
    "name" TEXT,
    "balance" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Account" ("IBAN", "accountOwnerId", "balance", "id", "name", "status") SELECT "IBAN", "accountOwnerId", "balance", "id", "name", "status" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_accountOwnerId_key" ON "Account"("accountOwnerId");
CREATE UNIQUE INDEX "Account_IBAN_key" ON "Account"("IBAN");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
