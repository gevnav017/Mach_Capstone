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

router.post("/users/login", async (req, res) => {
  try {
    const token = req.headers.authorization;

    // if token found in users window
    if (token) {
      console.log("token path")
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (!user) {
        res.status(401).json("User not found");
      } else {
        res.json(user);
      }
    }
    // if token not found in users window
    else {
      console.log("login path")
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = { userName: req.body.username, password: hashedPassword };
      
      const dbUserFound = await prisma.users.findUnique({
        where: user
        // {
        //   userName: req.body.username
        // },
      });

      console.log(dbUserFound)

      if (!dbUserFound) {
        res.status(401).json("User not found");
      } else {
        res.json(user);
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

    // add user already exists check error status 409

    // add user to database
    const newUser = await prisma.users.create({
      data: user,
    });

    // create jwt token for user
    const jwtUser = { username: user.userName, password: user.password };
    const token = jwt.sign(jwtUser, process.env.JWT_SECRET_KEY);

    res.json({ token: token, user: user });
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
