-- CreateEnum
CREATE TYPE "Providers" AS ENUM ('local', 'google', 'github');

-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "tiket" INTEGER NOT NULL,
    "yield" DOUBLE PRECISION NOT NULL,
    "sold" DOUBLE PRECISION NOT NULL,
    "daysLeft" INTEGER NOT NULL,
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "provider" "Providers" NOT NULL DEFAULT 'local',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
