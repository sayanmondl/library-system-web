import Link from "next/link";
import { LibrarySquare, UserSquare } from "lucide-react";

const Footbar = () => {
  return (
    <footer className="py-4 bg-white-100 z-10 md:hidden fixed bottom-0 w-full">
      <div className="flex justify-evenly">
        <Link href="/" className="flex gap-3 hover:bg-white-400 border rounded px-4 py-2">
          <LibrarySquare />
          <p>books</p>
        </Link>
        <Link href="/profile" className="flex gap-3 hover:bg-white-400 border rounded px-4 py-2">
          <UserSquare />
          <p>profile</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footbar;
