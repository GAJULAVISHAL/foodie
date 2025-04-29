/*
  Warnings:

  - The values [SALAD,SIDE_DISH,BREAKFAST,KIDS,SPECIAL] on the enum `category` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `OrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `OrderItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "category_new" AS ENUM ('APPETIZER', 'SOUP', 'MAIN_COURSE', 'DESSERT', 'BEVERAGE', 'ALCOHOLIC');
ALTER TABLE "MenuItem" ALTER COLUMN "category" TYPE "category_new" USING ("category"::text::"category_new");
ALTER TYPE "category" RENAME TO "category_old";
ALTER TYPE "category_new" RENAME TO "category";
DROP TYPE "category_old";
COMMIT;

-- AlterTable
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id");
