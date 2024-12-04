"use server";

import connectDB from "./db";
import { put } from "@vercel/blob";
import { Book } from "@/models/Book";
import { cache } from "react";

export async function newBook(formData: FormData) {
  try {
    await connectDB();

    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const publish = formData.get("publish") as string;
    const pages = formData.get("pages") as string;
    const language = formData.get("language") as string;
    const country = formData.get("country") as string;
    const link = formData.get("link") as string;
    const image = formData.get("image") as File | null;
    const stock = Number(formData.get("stock"));

    let imageUrl = "";
    if (image && image.size > 0) {
      const { url } = await put(`books/${image.name}`, image, {
        access: "public",
        addRandomSuffix: true,
      });
      imageUrl = url;
    }

    let bookId = title
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[+]/g, "plus")
      .replace(/[^a-z0-9\-_]/g, "");

    const existingBook = await Book.findOne({ bookId: bookId });
    if (existingBook) {
      if (existingBook.author === author) {
        console.error("This book already exists or cannot be added.");
        return { success: false, message: "Failed to add book" };
      } else {
        bookId =
          bookId +
          "_" +
          author
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/[^a-z0-9\-_]/g, "");
      }
    }

    if (bookId.length < 10) {
      bookId =
        bookId +
        "_" +
        author
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-z0-9\-_]/g, "");
    }

    const newBook = new Book({
      bookId,
      title,
      author,
      publish,
      pages,
      language,
      country,
      link,
      imageUrl,
      stock,
    });

    await newBook.save();

    return { success: true, message: "Book added successfully" };
  } catch (error) {
    console.error("Error adding book:", error);
    return { success: false, message: "Failed to add book" };
  }
}

export const getBookInfo = cache(async (bookId: string) => {
  await connectDB();

  try {
    const book = await Book.findOne({ bookId: bookId });
    if (!book) {
      return;
    }

    const bookDTO = {
      title: book.title,
      author: book.author,
      publish: book.publish,
      pages: book.pages,
      language: book.language,
      country: book.country,
      link: book.link,
      imageUrl: book.imageUrl,
      stock: book.stock,
    };

    return bookDTO;
  } catch (error) {
    console.error("Failed to fetch book data:", error);
  }
});
