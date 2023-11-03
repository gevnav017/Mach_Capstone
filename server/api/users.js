const express = require('express')
const router = express.Router()
const prisma = require('../db/client')

// all users
router.get("/users", async (req, res) => {
    try {
        const users = await prisma.users.findMany()
        res.json(users)
    }
    catch (err) {
        console.log(err)
    }
})

// one user by id
router.get("/users/:userId", async (req, res) => {
    try {
        const { userId } = req.params
        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        })
        res.json(user)
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router