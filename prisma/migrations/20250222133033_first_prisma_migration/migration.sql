-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "telegramId" TEXT,
    "phoneNumber" TEXT,
    "notes" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
