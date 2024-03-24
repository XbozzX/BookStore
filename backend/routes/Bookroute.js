import express from "express";
import { BookSchema } from "../models/book_DM.js";

const route = express.Router();

//Route for GET the book data
route.get("/", async (req, res) => {
  try {
    const books = await BookSchema.find(); //will find all the book data
    return res.status(200).json({
      count: books.length, //create count for the json data
      data: books, //get the book data
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

//Route for GET the book data by id
route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; //the server need the id from the  browser
    const books = await BookSchema.findById(id); //will find the book data by id
    return res.status(200).json({
      count: books.length, //create count for the json data
      data: books, //get the book data
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

//Route for update the book data
route.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({ message: "Sent all the required field" });
    }
    {
      const { id } = req.params;
      const result = await BookSchema.findByIdAndUpdate(id, req.body);

      if (!result) {
        res.status(404).json({ message: "Book not found " });
      }
    }
    return res.status(200).send({ message: "Book succesfull update" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// route for DELETE the book data
route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BookSchema.findByIdAndDelete(id);

    if (!result) {
      res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book have been deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// route for POST the book data
route.post("/", async (req, res) => {
  try {
    //Validate the required data
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Sent all required field" });
    }
    // Create the BookSchema
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const books = await BookSchema.create(newBook);

    return res.status(201).send(books);

    // Catch the error
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default route;
