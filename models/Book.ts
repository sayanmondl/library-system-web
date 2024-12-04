import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  publish: { type: String, required: true },
  pages: { type: String, required: true },
  language: { type: String, required: true },
  country: { type: String, required: true },
  link: { type: String, required: true },
  imageUrl: { type: String },
  stock: { type: Number, default: 1 },
});

export const Book = mongoose.models?.Book || mongoose.model("Book", bookSchema);
