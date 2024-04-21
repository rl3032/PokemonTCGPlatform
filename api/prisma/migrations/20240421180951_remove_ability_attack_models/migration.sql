/*
  Warnings:

  - You are about to drop the `Ability` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Attack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Ability` DROP FOREIGN KEY `Ability_cardId_fkey`;

-- DropForeignKey
ALTER TABLE `Attack` DROP FOREIGN KEY `Attack_cardId_fkey`;

-- DropTable
DROP TABLE `Ability`;

-- DropTable
DROP TABLE `Attack`;
