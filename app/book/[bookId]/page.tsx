import IssueBook from "@/app/components/IssueBook";
import { getBookInfo } from "@/lib/book";
import { getSession } from "@/lib/getSession";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ bookId: string }> }) => {
  const { bookId } = await params;
  const bookInfo = await getBookInfo(bookId);

  const session = await getSession();
  const user = session?.user;

  const issueParams = {
    bookId: bookId,
    userEmail: user?.email as string,
  };

  return (
    <section className="2xl:mx-64 xll:mx-48 xl:mx-32 lg:mx-16 xm:mx-10 md:mx-8 sm:mx-4 mx-2">
      <h1 className="text-3xl mt-6 sm:text-5xl text-center">{bookInfo?.title}</h1>

      <div className="flex flex-col xm:flex-row w-full mt-12 items-start lg:items-center gap-8 ">
        <div className="w-full xm:w-[350px] h-[460px] overflow-hidden border group-hover:border-white-100 flex items-center">
          <Image
            src={bookInfo?.imageUrl}
            alt="Book Cover"
            width={350}
            height={460}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 w-full">
          <div className="flex flex-col xs:flex-row xm:flex-col lg:flex-row w-full gap-4">
            <div className="border flex-1 text-center p-3">
              <h1 className="my-2 text-2xl xl:text-3xl">Language</h1>
              <h2 className="my-2 font-old text-black-400">{bookInfo?.language}</h2>
            </div>
            <div className="border flex-1 text-center p-3">
              <h1 className="my-2 text-2xl xl:text-3xl">Publish</h1>
              <h2 className="my-2 font-old text-black-400">{bookInfo?.publish}</h2>
            </div>
            <div className="border flex-1 text-center p-3">
              <h1 className="my-2 text-2xl xl:text-3xl">Author</h1>
              <h2 className="my-2 font-old text-black-400">{bookInfo?.author}</h2>
            </div>
          </div>

          <div>
            <div className="w-56 border px-10 py-4 text-center justify-self-center mt-10">
              <h2 className="font-old text-xl">Stock: {bookInfo?.stock}</h2>
            </div>

            <div className="flex flex-col items-center xs:items-start xs:flex-row justify-between mt-10 gap-4">
              <Link href={bookInfo?.link}>
                <button className="button-black">More details</button>
              </Link>
              {user ? (
                <IssueBook {...issueParams} />
              ) : (
                <Link href="/login">
                  <button className="button-black">
                    Sign in to issue
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
