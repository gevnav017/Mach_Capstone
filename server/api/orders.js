const express = require('express')
const router = express.Router()
const prisma = require('../db/client')

// all orders by user
router.get("/account/orders/:userId", async (req, res) => {
    try {
        const { userId } = req.params
        const orders = await prisma.products.findMany({
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

module.exports = router