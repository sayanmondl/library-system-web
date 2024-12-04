"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Book {
  _id: string;
  bookId: string;
  title: string;
  author: string;
  publish: string;
  pages: string;
  language: string;
  country: string;
  link: string;
  imageUrl: string;
  stock: number;
}

const ListSearchedBooks = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!searchQuery) {
      setBooks([]);
      setLoading(false);
      return;
    }

    try {
      const encodedQuery = encodeURIComponent(searchQuery);
      const response = await fetch(`/api/books/search?query=${encodedQuery}`);
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      setBooks(data.books || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks, searchQuery]);

  return (
    <section className="mx-2 space-x-5 sm:mx-4 md:mx-8 xm:mx-10 lg:mx-16 xl:mx-32">
      <div className="flex w-full flex-col items-center py-4">
        <p className="text-2xl">
          search results for
          <span className="text-green-600">&nbsp; "{searchQuery}"</span>
        </p>
        <br />
        <br />
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && books.length === 0 && <p>No books found.</p>}
        <div className="md: grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BookCard = ({ book }: { book: Book }) => (
  <div className="relative flex w-full overflow-hidden border p-2 transition-transform duration-300">
    <div className="h-300px h-min w-[200px] min-w-[200px] sm:h-[400px] sm:w-[250px] sm:min-w-[250px]">
      <Image
        src={book.imageUrl || "/placeholder.svg"}
        alt={book.title}
        width={300}
        height={400}
        className="h-full w-full border object-cover"
      />
    </div>
    <div className="relative p-4">
      <h2 className="mb-2 text-2xl sm:text-3xl">{book.title}</h2>
      <p className="mb-10 font-old text-lg text-black-300 group-hover:text-black-300">
        {book.author}
      </p>
      <BookDetails book={book} />
      <div className="h-10"></div>
    </div>
    <Link href={`/book/${book.bookId}`} className="absolute bottom-2 right-2">
      <button className="button-black2 flex justify-center gap-4">
        open
        <ArrowRight />
      </button>
    </Link>
  </div>
);

const BookDetails = ({ book }: { book: Book }) => (
  <>
    {["publish", "pages", "language", "country"].map((field) => (
      <div key={field} className="text-black-100">
        <span className="font-gloock">{field}: </span>
        <span className="font-old italic">
          &nbsp;&nbsp;{book[field as keyof Book] || "N/A"}
        </span>
      </div>
    ))}
  </>
);

export default ListSearchedBooks;
