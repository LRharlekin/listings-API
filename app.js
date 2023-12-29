require("dotenv").config();
require("express-async-errors");
// const connectDB = require("./db/connect");
const express = require("express");

const app = express();

// require middlewares
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// pre-hook middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.status(200).send("Listings API");
});

// post-hook middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URI);
    // console.log("Connected to DB!");
    app.listen(port, () => {
      console.log(`Listening on PORT:${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
