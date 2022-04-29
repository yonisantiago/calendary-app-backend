const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists with this email",
      });
    }

    user = new User(req.body);

    //encrypting password with bcrypt
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //generate the JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error, please contact the administrator",
    });
  }
};

//loginUser
const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User DOES NOT EXIST with this email",
      });
    }

    //comparing the password with the encrypted password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid password",
      });
    }

    //Generating the JWT(JSON Web Token)
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error, please contact the administrator",
    });
  }
};

//renewing the token
const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  //generate a new JWT
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    msg: "Token renewed",
    uid: uid,
    name: name,
    token,
  });
};
//exporting
module.exports = {
  createUser,
  loginUser,
  renewToken,
};
