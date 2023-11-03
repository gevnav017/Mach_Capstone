-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "discount" BOOLEAN NOT NULL DEFAULT false,
    "freeShipping" BOOLEAN NOT NULL DEFAULT false,
    "dateCreated" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "brand" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" DECIMAL(7,2) NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist" (
    "id" UUID NOT NULL,
    "dateCreated" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "inCart" BOOLEAN NOT NULL DEFAULT false,
    "dateOrdered" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL,
    "review" INTEGER NOT NULL,
    "dateReviewed" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
