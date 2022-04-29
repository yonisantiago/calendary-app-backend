const express = require("express");
require("dotenv").config();
var cors = require("cors");
const { dbConnection } = require("./database/config");
//Create Express Server
const app = express();

//Database
dbConnection();

//CORS
app.use(cors());

//Public directory
app.use(express.static("public"));

//Read and parse of body
app.use(express.json());

//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

//Listen petitions
app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});
