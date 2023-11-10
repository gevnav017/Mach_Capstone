const express = require("express");
const router = express.Router();
const prisma = require("../db/client");
const bcrypt = require("bcrypt");

// all users
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };

    const dbUser = await prisma.users.findUnique({
        where: {
            userName: user.username
        }
    })
    res.json(dbUser)
  } 
  catch (err) {
    console.log(err);
  }
});

router.post("/users/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      userName: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    const newUser = await prisma.users.create({
      data: user,
    });
    res.json(newUser);
  } catch (err) {
    console.log(err);
  }
});

// one user by id
router.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
