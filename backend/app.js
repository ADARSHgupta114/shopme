const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
app.use(express.json())



//Routes
const product = require("./routes/productroutes");
const user = require("./routes/userRoute");
app.use("/api/v1",product);
app.use("/api/v1",user);
//Error
app.use(errorMiddleware);

module.exports = app

