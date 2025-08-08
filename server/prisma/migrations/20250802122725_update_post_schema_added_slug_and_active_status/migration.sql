/*
  Warnings:

  - You are about to drop the column `description` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Post` table. All the data in the column will be lost.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postImage` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "description",
DROP COLUMN "image",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "postImage" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;
