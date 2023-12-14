const express = require("express");
const router = express.Router();
const prisma = require("../db/client");

// all orders by user
router.get("/all-orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { timeRange } = req.query;

    let startDate;

    switch (timeRange) {
      case "last3Months":
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case "4To6Months":
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case "7To9Months":
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 9);
        break;
      default:
        startDate = null;
    }

    const orderHistory = await prisma.orders.findMany({
      where: {
        userId: userId,
        ordered: true,
        inCart: false,
        dateUpdated: startDate ? { gte: startDate } : undefined,
      },
      include: {
        products: true,
      },
    });

    res.json(orderHistory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get cart qty total for user in Navbar
router.get("/cartCount/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const cartCount = await prisma.orders.groupBy({
      by: "userId",
      where: {
        userId: userId,
        inCart: true,
      },
      _sum: {
        quantity: true,
      },
    });

    res.json(cartCount);
  } catch (err) {
    console.log(err);
  }
});

// get all current in cart or past/archived orders by user
router.get("/orders/:userId/:inCart", async (req, res) => {
  try {
    const { userId, inCart } = req.params;
    const inCartValue = inCart === "true";

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

// create order in orders table
router.post("/orders/new", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // check if item is already in cart
    const inOrders = await prisma.orders.findFirst({
      where: {
        userId,
        productId,
      },
    });

    // if already in cart
    if (!inOrders) {
      // add item to cart
      console.log(quantity);
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
      const newQty = inOrders.quantity + quantity;

      const updateQty = await prisma.orders.update({
        data: { quantity: newQty, inCart: true },
        where: { id: inOrders.id },
      });

      // console.log("updated");
      res.json(updateQty);
    }
  } catch (err) {
    console.log(err);
  }
});

// update quantity on increment or decrement in cart
router.post("/cartQtyChange", async (req, res) => {
  try {
    const { itemId, cartQtyChange } = req.body;

    const changeQty = await prisma.orders.update({
      where: {
        id: itemId,
      },
      data: {
        quantity: cartQtyChange,
      },
    });

    res.json(changeQty);
  } catch (err) {
    console.log(err);
  }
});

router.post("/wishlistToOrder", async (req, res) => {
  try {
    const { orderId } = req.body;

    const alreadyInCart = await prisma.orders.findFirst({
      where: {
        id: orderId,
        inCart: true,
      },
    });

    if (!alreadyInCart) {
      const wishlistToOrder = await prisma.orders.update({
        data: {
          inCart: true,
          // quantity: 1,
        },
        where: {
          id: orderId,
        },
      });

      res.json(wishlistToOrder);
    } else {
      res.status(400).json("already in cart");
    }
  } catch (err) {
    console.log(err);
  }
});

// remove items from cart
router.post("/orders/remove/:userId", async (req, res) => {
  try {
    const { userId, inCart } = req.params;
    const { productId } = req.body;
    // console.log(productId, userId, inCart);

    const removeFromCart = await prisma.orders.update({
      where: {
        id: productId,
        userId: userId,
        inCart: true,
      },
      data: {
        inCart: false
      }
    });
    // console.log(removeFromCart);
    res.json(removeFromCart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error 500" });
  }
});

//now adding order to wishlist
router.post("/cartToWishlist", async (req, res) => {
  try{
    const { productId } = req.body;

    //checking to see if product already in wishlist
    const alreadyInWishlist = await prisma.orders.findFirst({
      where: {
        id: productId,
        inWishlist: true
      },
    });

    if (!alreadyInWishlist) {
      const cartToWishlist = await prisma.orders.update({
        data: {
          inWishlist: true,
        },
        where: {
          id: productId,
        },
      });

      res.json(cartToWishlist);
    } else {
      res.status(400).json("Already in wishlist");
    }
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
