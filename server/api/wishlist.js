const express = require('express')
const router = express.Router()
const prisma = require('../db/client')

// all wishlist by user
router.get("/account/wishlist/:userId", async (req, res) => {
    try {
        const { userId } = req.params
        const wishlist = await prisma.products.findMany({
            where: {
                id: userId
            },
            include: {
                products: true
            }
        })
        res.json(wishlist)
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router