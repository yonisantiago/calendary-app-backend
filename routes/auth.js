/* 
    User Routes / Auth
    host + /api/auth

*/

const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { fieldValidator } = require("../middlewares/fields-validator");
const { validateJWT } = require("../middlewares/validate-jwt");

const { createUser, loginUser, renewToken } = require("../controllers/auth");

router.post(
  "/new",
  [
    //middlewares
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at least 6 characteres").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at least 6 characteres").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  loginUser
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
