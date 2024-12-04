import { NextResponse } from "next/server";
import { Book } from "@/models/Book";
import connectDB from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let query = searchParams.get("query") || "";

  try {
    await connectDB();

    query = decodeURIComponent(query).trim();
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    console.log("Decoded query:", query);
    console.log("Escaped query for regex:", escapedQuery);

    const books = await Book.find({
      $or: [
        { title: { $regex: escapedQuery, $options: "i" } },
        { author: { $regex: escapedQuery, $options: "i" } },
      ],
    });

    return NextResponse.json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
