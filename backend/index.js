import express from "express";
import { PORT, Smart_DM_URL } from "./config.js";
import { mongoose } from "mongoose";
import { BookSchema } from "./models/book_DM.js";

const app = express();

//create middleware for parsing the body
app.use(express.json());

app.post("/books", async (req, res) => {
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

    const book = await BookSchema.create(newBook);

    return res.status(201).send(book);

    // Catch the error
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(Smart_DM_URL)
  .then(() => {
    console.log("Connect");

    // localport setup
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });

    // http setup
    app.get("/", (req, res) => {
      console.log(req);
      return res.status(234).send("Welcome bro");
    });
  })
  .catch((error) => {
    console.log(error);
  });
