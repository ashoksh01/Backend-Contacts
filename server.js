const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT ||  5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));


app.listen(port, () =>{
  console.log(`Server is running on port ${port}`);
});




// import express from "express";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import path from "path";

// import { connectDB } from "./config/db.js";
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// dotenv.config();
// const router = express.Router();

// //calling the connection to the database
// connectDB();

// //initializing express
// const app = express();

// //for running morgan in development environment
// if (process.env.NODE_ENV === "development") {
//     app.use(morgan("dev"));
//   }

// //allow us to accept json data in the body (req.body)
// app.use(express.urlencoded({ extended: true }));

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// //config for deployment
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "/frontend/build")));
  
//     //if any route that's not our API will point to the index.html
//     app.get("*", (req, res) =>
//       res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//     );
  
//     corsOrigin = process.env.LIVE_URL;
//   } else {
//     app.get("/", (req, res) => {
//       res.send("API is running...");
//     });
//   }

// //Custom error handling
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// const server = app.listen(
//   PORT,
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
// );
  