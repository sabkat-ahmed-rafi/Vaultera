/*
  Warnings:

  - You are about to drop the column `paddleCustomerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `paddleSubscriptionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `paid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `paymentExpiresAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `paymentType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionStatus` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "paddleCustomerId",
DROP COLUMN "paddleSubscriptionId",
DROP COLUMN "paid",
DROP COLUMN "paymentExpiresAt",
DROP COLUMN "paymentType",
DROP COLUMN "subscriptionStatus";
