import React from "react";
import { Search } from "lucide-react";

const SearchBook = ({ query }: { query?: string }) => {
  return (
    <form action="/search" className="flex gap-3">
      <input
        name="query"
        type="search"
        defaultValue={query}
        className="search-input text-black-100 font-old items-center placeholder:text-black-300 outline-none px-2 bg-white"
        placeholder="search a book ..."
      />

      <button type="submit" className="bg-black-100 px-3 flex justify-center items-center rounded-[5px]">
        <Search className="text-white" />
      </button>
    </form>
  );
};

export default SearchBook;
