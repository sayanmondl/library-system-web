import Image from "next/image";
import Link from "next/link";
import SearchBook from "./SearchBook";
import { LibrarySquare, UserSquare } from "lucide-react";

const Navbar = ({ searchParams = {} }: { searchParams?: { query?: string } }) => {
  const query = searchParams?.query;

  return (
    <header className="xl:mx-36 lg:mx-24 py-6 bg-white md:mx-16 sm:mx-8 mx-4">
      <nav className="flex justify-between items-center">
        <Link href="/" className="md:hidden xm:block">
          <div className="flex items-center">
            <Image className="hidden xs:block" src="/book.svg" alt="logo" width={28} height={28} />
            <h1 className="px-4">Libr...</h1>
          </div>
        </Link>

        <div className="w-min left-1/2 -translate-x-1/2 gap-5 hidden md:flex md:relative md:translate-x-0 md:left-0 xm:absolute xm:-translate-x-1/2 xm:left-1/2">
          <Link href="/" className="flex gap-3 hover:bg-white-400 rounded px-4 py-2">
            <LibrarySquare />
            <p>books</p>
          </Link>
          <Link href="/profile" className="flex gap-3 hover:bg-white-400 rounded px-4 py-2">
            <UserSquare />
            <p>profile</p>
          </Link>
        </div>

        <SearchBook query={query} />
      </nav>
    </header>
  );
};

export default Navbar;
