/*
  Warnings:

  - You are about to drop the column `quizId` on the `Leaderboard` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Leaderboard" DROP CONSTRAINT "Leaderboard_quizId_fkey";

-- AlterTable
ALTER TABLE "Leaderboard" DROP COLUMN "quizId",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
