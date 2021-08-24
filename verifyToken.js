require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.TOKEN_SECRET;

exports.verify = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.status(403).json({ error: "Please provide a token." });
  else {
    jwt.verify(token.split(" ")[1], tokenSecret, (err, user) => {
      if (err)
        res
          .status(401)
          .json({
            error: "Your login session has expired! Kindly log in again.",
          });
      req.user = user.data;
      next();
    });
  }
};
