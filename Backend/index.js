import express, { request, response } from "express";
import { PORT, MongoURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./Models/bookModels.js";

const app = express();
app.use(express.json());

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

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to my application");
});

app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      message: error.message,
    });
  }
});

app.get("/book/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      message: error.message,
    });
  }
});

app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(400).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      message: error.message,
    });
  }
});
