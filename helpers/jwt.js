const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "8h",
      },
      (err, token) => {
        if (err) {
          console.log(error);
          reject("Error generating the token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
