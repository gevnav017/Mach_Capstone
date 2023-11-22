/*
  Warnings:

  - The `zipCode` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "birthDate" SET DEFAULT 'MM-DD-YYYY',
DROP COLUMN "zipCode",
ADD COLUMN     "zipCode" INTEGER;
