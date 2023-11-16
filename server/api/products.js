const express = require("express");
const router = express.Router();
const prisma = require("../db/client");

// all products
router.get("/products", async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    
    res.json(products);
  } catch (err) {
    console.log(err);
  }
});

// all products based on category and userId
router.post("/products", async (req, res) => {
  try {
    const { userId, category } = req.body;
    console.log(userId, category);
    
    const products = await prisma.products.findMany({
      where: {
        category: category,
      },
      include: {
        orders: {
          where: {
            userId: userId,
          },
        },
      },
    });
    console.log(products);
    
    res.json(products);
  } catch (err) {
    console.log(err);
  }
});

// all products based on category
router.get("/products", async (req, res) => {
  try {
    const { category } = req.body;
    console.log(category)
    
    const products = await prisma.products.findMany({
      where: {
        category: category,
      },
    });
    
    res.json(products);
  } catch (err) {
    console.log(err);
  }
});

// single product by id
router.get("/product/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await prisma.products.findUnique({
      where: {
        id: itemId,
      },
    });

    res.json(item);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
