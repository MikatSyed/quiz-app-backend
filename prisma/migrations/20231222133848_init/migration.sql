/*
  Warnings:

  - You are about to drop the column `quizCategoryId` on the `Question` table. All the data in the column will be lost.
  - Added the required column `type` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CategoryId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OptionType" AS ENUM ('A', 'B', 'C', 'D');

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizCategoryId_fkey";

-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "type" "OptionType" NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "quizCategoryId",
ADD COLUMN     "CategoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
