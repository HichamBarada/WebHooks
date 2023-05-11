import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";

import webhooksRoutes from "./routes/webhooksRoutes.js";
dotenv.config(); // config .env
connectDB(); // connect to database

const app = express();

// use .body (put, post)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("uploads")); // to be able to fetch from uploads(images) to frontend

//routes

app.use("/api/", webhooksRoutes);
app.use(notFound); // If page not found
app.use(errorHandler); // To override the default error handling that return html with message we use this errorHandler.

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
