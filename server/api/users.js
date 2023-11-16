require("dotenv").config();
const express = require("express");
const router = express.Router();
const prisma = require("../db/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

// all users
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

router.get("/user/auth/me", (req, res) => {
  try {
    const token = req.headers.authorization;

    // if token found in users window
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

      delete user.password;

      if (!user) {
        console.log("user not found");
        res.status(401).json("User not found");
      } else {
        console.log("user logged in");
        res.json(user);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const dbUser = await prisma.users.findUnique({
      where: { userName: req.body.username },
    });

    if (!dbUser) {
      console.log("user not in db");
      res.status(401).json("User not found");
    } else {
      const authUser = await bcrypt.compare(
        req.body.password,
        dbUser.password
      );

      if (!authUser) {
        res.status(401).json("not authorized");
      } else {
        delete dbUser.discount
        delete dbUser.freeShipping

        const token = jwt.sign(dbUser, process.env.JWT_SECRET_KEY);

        res.json({ token: token });
      }
    }
  } catch (err) {
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

    // add username already exists check error status 409

    // add user to database
    const newUser = await prisma.users.create({
      data: user,
    });

    delete newUser.discount;
    delete newUser.freeShipping;

    // create jwt token for user
    if (newUser) {
      const token = jwt.sign(newUser, process.env.JWT_SECRET_KEY);

      res.json({ token: token });
    }
  } catch (err) {
    console.log(err);
  }
});

// one user by id
// router.get("/users/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await prisma.users.findUnique({
//       where: {
//         id: userId,
//       },
//     });
//     res.json(user);
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
