import { mongoose } from "mongoose";

// schema for timer sensor data
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Create model based on schema
export const BookSchema = mongoose.model("BookSchema", bookSchema);
