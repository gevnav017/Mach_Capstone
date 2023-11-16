const express = require("express");
const router = express.Router();
const prisma = require("../db/client");

// get all wishlist by user
router.get("/account/wishlist/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await prisma.orders.findMany({
      where: {
        userId: userId,
        inWishlist: true
      },
      include: {
        products: true,
      },
    });

    res.json(wishlist);
  } catch (err) {
    console.log(err);
  }
});

// post user wishlist item to wishlist table
router.post("/account/wishlist", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const inWishlist = await prisma.orders.findFirst({
      where: {
        userId: userId,
        productId: productId,
        inWishlist: true,
      },
    });

    if (!inWishlist) {
      const addToWishlist = await prisma.orders.create({
        data: {
          userId: userId,
          productId: productId,
          quantity: 0,
          inWishlist: true,
        },
      });
      res.json(addToWishlist);
    } else {
      res.status(400).json("already in wishlist");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
