import express, { request, response } from "express";
import { PORT, MongoURL } from "./config.js";
import mongoose from "mongoose";
import router from "./Routes/BooksRoutes.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use('/books' , router);
app.use(cors())

mongoose
  .connect(MongoURL)
  .then(() => {
    console.log("Successfully connected to mongodb");
    app.listen(PORT, () => {
      console.log(`Server chalraha hai : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

