const express = require("express");
const router = express.Router();
const prisma = require("../db/client");

// get all orders by user
router.get("/account/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await prisma.orders.findMany({
      where: {
        userId: "b7e93e4f-7da1-4af6-970d-3306f9d4f4c1",
      },
      include: {
        products: true,
      },
    });

    res.json(orders);
  } catch (err) {
    console.log(err);
  }
});

// post user order of product to orders table
router.post("/account/orders", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // check if item is already in cart
    const inCart = await prisma.orders.findFirst({
      where: {
        userId,
        productId,
        inCart: true,
      },
    });

    // if already in cart
    if (!inCart) {
      // add item to cart
      const addToCart = await prisma.orders.create({
         data: {
          userId,
          productId,
          quantity,
          inCart: true,
        },
      });

      // console.log("added");
      res.json(addToCart);
    } else {
      // already in cart, update qty
      itemInCartId = inCart.id;

      const updateQty = await prisma.orders.update({
        data: { quantity: quantity },
        where: { id: itemInCartId },
      });

      // console.log("updated");
      res.json(updateQty);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
