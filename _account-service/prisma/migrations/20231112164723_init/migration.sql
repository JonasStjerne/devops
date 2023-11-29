-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accountOwnerId" INTEGER NOT NULL,
    "IBAN" INTEGER NOT NULL,
    "name" TEXT,
    "balance" INTEGER NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_accountOwnerId_key" ON "Account"("accountOwnerId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_IBAN_key" ON "Account"("IBAN");
