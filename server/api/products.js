const express = require('express')
const router = express.Router()
const prisma = require('../db/client')

// all products
router.get("/products", async (req, res) => {
    try {
        const products = await prisma.products.findMany()
        res.json(products)
    }
    catch (err) {
        console.log(err)
    }
})

// one product by id
router.get("/products/:productId", async (req, res) => {
    try {
        const { productId } = req.params
        const product = await prisma.products.findUnique({
            where: {
                id: productId
            }
        })
        res.json(product)
    }
    catch (err) {
        console.log(err)
    }
})

// all speakers
router.get("/speakers", async (req, res) => {
    try {
        const speakers = await prisma.products.findMany({
            where: {
                category: "Speaker"
            }
        })
        res.json(speakers)
    }
    catch (err) {
        console.log(err)
    }
})

// all headphones
router.get("/headphones", async (req, res) => {
    try {
        const headphones = await prisma.products.findMany({
            where: {
                category: "Headphone"
            }
        })
        res.json(headphones)
    }
    catch (err) {
        console.log(err)
    }
})

// all earbuds
router.get("/earbuds", async (req, res) => {
    try {
        const earbuds = await prisma.products.findMany({
            where: {
                category: "Earbud"
            }
        })
        res.json(earbuds)
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router