require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.TOKEN_SECRET;
const middleware = require("../verifyToken");
const jsonParser = express.json();

router.post("/signup", jsonParser, async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        res.status(400).json({
          error:
            "A user with the email provided exists in the database... Kindly login!",
        });
      }
      bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
        if (error) {
          res.status(500).json(error);
        }
        if (!user) {
          const newUser = User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
          });
          newUser
            .save()
            .then((user) => {
              res.status(200).json({ token: generateToken(user) });
            })
            .catch((error) => {
              res.status(500).json({ message: error.message });
            });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", jsonParser, async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        res
          .status(403)
          .json({ error: "No user with that email found...Kindly signup!" });
      } else {
        bcrypt.compare(req.body.password, user.password, (error, match) => {
          if (error) {
            res.status(500).json(error);
          } else if (match) {
            res.status(200).json({message: "Success!", token: generateToken(user), user });
          } else {
            res
              .status(400)
              .json({
                error:
                  "Passwords do not match... Kindly enter a valid password!",
              });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/jwt-test", middleware.verify, (req, res) => {
  res.status(200).json(user);
});
function generateToken(user) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "5m" });
}
module.exports = router;
