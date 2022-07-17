const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
app.use(express.json())



//Routes
const product = require("./routes/productroutes");
app.use("/api/v1",product);

//Error
app.use(errorMiddleware);

module.exports = app

