const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

async function authenticate(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  const { email, password } = req.headers;

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "forbidden" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorizhed" });
  }
}

module.exports = authenticate;
