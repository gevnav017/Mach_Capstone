const express = require("express");
const router = express.Router();
const prisma = require("../db/client");

// get all past/archived orders by user
router.get("/orders/:userId/:inCart", async (req, res) => {
  try {
    const { userId, inCart } = req.params;

    const inCartValue = inCart === "true" ? true : false;

    const orders = await prisma.orders.findMany({
      where: {
        userId: userId,
        inCart: inCartValue,
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

// create user order of product to orders table
router.post("/orders/new", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    console.log("new order ", userId, productId, quantity);

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
      const newQty = inCart.quantity + quantity;

      const updateQty = await prisma.orders.update({
        data: { quantity: newQty },
        where: { id: inCart.id },
      });

      // console.log("updated");
      res.json(updateQty);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
