const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Use CORS middleware to allow requests from your React frontend
app.use(cors({
  origin: "http://localhost:3000", // Update with your React app's URL
  methods:["GET,HEAD,PUT,PATCH,POST,DELETE"],
  credentials: true,
    }));

app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
mongoose
  .connect(
    `mongodb+srv://abhishekerugadindla:s3K6RThtGhjIYr2s@cluster0.r0hy3xx.mongodb.net/?retryWrites=true&w=majority`

    
    )
  .then(() => {
    app.listen(5000, () => {
      console.log(`Server is running on port 5000`);
    });
    console.log("Database is connected!");
  })
  .catch((err) => console.log(err));
