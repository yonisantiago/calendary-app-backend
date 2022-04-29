const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  // X-TOKEN HEADER
  const token = req.header("x-token");

  if (!token || token === "") {
    return res.status(401).json({
      ok: false,
      msg: "No token provided",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
