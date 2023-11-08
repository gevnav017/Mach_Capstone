const express = require('express')
const router = express.Router()
const prisma = require('../db/client')

// get all orders by user
router.get("/account/orders/:userId", async (req, res) => {
    try {
        const { userId } = req.params
        const orders = await prisma.orders.findMany({
            where: {
                id: userId
            },
            include: {
                products: true
            }
        })
        res.json(orders)
    }
    catch (err) {
        console.log(err)
    }
})

// post user order of product to orders table
router.post("/account/orders", async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body
        const addToCart = await prisma.orders.create({
            data: {
                userId,
                productId,
                quantity,
                inCart: true
            }
        })
        res.json(addToCart)
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router