"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

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

export default function FetchAllBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const fetchBooks = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/books?page=${page}`);
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      if (data.books.length === 0) {
        setHasMore(false);
      } else {
        setBooks((prevBooks) => [...prevBooks, ...data.books]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      setError("An error occurred while fetching books.");
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    if (inView) {
      fetchBooks();
    }
  }, [inView, fetchBooks]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && books.length === 0) {
        setBooks([]);
        setPage(1);
        setHasMore(true);
        fetchBooks();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [books.length, fetchBooks]);

  return (
    <div className="py-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-1 md: lg:grid-cols-2 gap-6">
        {books.map((book, index) => (
          <BookCard key={`${book._id}-${index}`} book={book} />
        ))}
      </div>
      {loading && <LoadingIndicator />}
      {error && <ErrorMessage message={error} />}
      {!hasMore && <NoMoreBooks />}
      <div ref={ref} style={{ height: "10px" }} />
    </div>
  );
}

const BookCard = ({ book }: { book: Book }) => (
  <div className="border w-full overflow-hidden flex transition-transform duration-300 p-2 relative">
    <div className="w-[200px] min-w-[200px] h-300px sm:min-w-[250px] sm:w-[250px] h-min sm:h-[400px]">
      <Image
        src={book.imageUrl || "/placeholder.svg"}
        alt={book.title}
        width={300}
        height={400}
        className="h-full w-full object-cover border"
      />
    </div>
    <div className="p-4 relative">
      <h2 className="mb-2 text-2xl sm:text-3xl">{book.title}</h2>
      <p className="text-black-300 text-lg font-old mb-10 group-hover:text-black-300">
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
        <span className="font-old italic">&nbsp;&nbsp;{book[field as keyof Book]}</span>
      </div>
    ))}
  </>
);

const LoadingIndicator = () => (
  <div className="flex justify-center items-center mt-6">
    <Loader2 className="animate-spin mr-3" />
    <h2>loading...</h2>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <p className="text-red-500 text-center mt-6">{message}</p>
);

const NoMoreBooks = () => <p className="text-center font-old mt-6">no more books to load</p>;
