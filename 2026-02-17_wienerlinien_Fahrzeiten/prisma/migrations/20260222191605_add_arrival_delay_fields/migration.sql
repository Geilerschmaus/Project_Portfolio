-- CreateTable
CREATE TABLE "Station" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rbl" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Departure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "line" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "expectedArrival" DATETIME NOT NULL,
    "actualArrival" DATETIME,
    "delayMinutes" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stationId" INTEGER NOT NULL,
    CONSTRAINT "Departure_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Station_rbl_key" ON "Station"("rbl");
