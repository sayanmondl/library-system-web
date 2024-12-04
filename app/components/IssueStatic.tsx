import { Calendar, Clock3Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface StaticIssueProp {
  bookId: string;
  imageUrl: string;
  title: string;
  author: string;
  issueDate: string;
  issueTime: string;
  dueDate: string;
  returnDate: string;
}

const IssueStatic = async ({
  bookId,
  imageUrl,
  title,
  author,
  issueDate,
  issueTime,
  returnDate,
}: StaticIssueProp) => {
  const isReturned = () => {
    if (returnDate == "Invalid Date") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="border p-4">
      <Link href={`/book/${bookId}`}>
        <div className="w-full h-[300px] overflow-hidden flex border">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      <h1 className="text-[28px] mt-4">{title}</h1>
      <p className="font-old mt-0.5 text-black-300">by {author}</p>
      <div className="flex gap-3 mt-5">
        <Calendar className="size-5" />
        <p className="font-old">
          Issued on {issueDate}, {issueTime}
        </p>
      </div>
      {isReturned() ? (
        <div className="flex gap-3 mt-2">
          <Clock3Icon className="size-5 text-green-700" />
          <p className="font-old text-green-700">Returned on {returnDate}</p>
        </div>
      ) : (
        <div className="flex gap-3 mt-2">
          <Clock3Icon className="size-5 text-red-700" />
          <p className="text-red-700 font-old">Book not returned</p>
        </div>
      )}
    </div>
  );
};

export default IssueStatic;
