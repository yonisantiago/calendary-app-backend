const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("DB is connected/online");
  } catch (error) {
    console.log(error);
    throw new Error("Error initializing database");
  }
};

module.exports = { dbConnection };
