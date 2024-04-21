/*
  Warnings:

  - You are about to drop the column `priceId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Price` DROP FOREIGN KEY `Price_cardId_fkey`;

-- DropIndex
DROP INDEX `Card_priceId_key` ON `Card`;

-- AlterTable
ALTER TABLE `Card` DROP COLUMN `priceId`,
    ADD COLUMN `highPrice` DOUBLE NULL,
    ADD COLUMN `lowPrice` DOUBLE NULL,
    ADD COLUMN `marketPrice` DOUBLE NULL,
    ADD COLUMN `midPrice` DOUBLE NULL;

-- DropTable
DROP TABLE `Price`;
