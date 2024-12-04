import { Book, Dock, Library } from "lucide-react";
import FetchAllBooks from "../components/FetchAllBooks";

export default function Home() {
  const initialSort = "name";
  return (
    <>
      <section className="flex justify-center items-center py-2 my-4 gap-4">
        <h1 className="text-2xl sm:text-3xl">Book Collection</h1>
        <Library className="size-6 sm:size-8"/>
      </section>

      <section className="xl:mx-32 space-x-5 lg:mx-16 xm:mx-10 md:mx-8 sm:mx-4 mx-2">
        <FetchAllBooks />
      </section>
    </>
  );
}
