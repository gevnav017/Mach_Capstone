const express = require('express')
const router = express.Router()
const prisma = require('../db/client')

// get all wishlist by user
router.get("/account/wishlist/:userId", async (req, res) => {
    try {
        const { userId } = req.params
        const wishlist = await prisma.wishlist.findMany({
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

// post user wishlist item to wishlist table
router.post("/account/wishlist", async (req, res) => {
    try {
        const { userId, productId } = req.body
        const addToWishlist = await prisma.wishlist.create({
            data: {
                userId: userId,
                productId: productId
            }
        })
        res.json(addToWishlist)
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router