import { Calendar, Clock3Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReturnBook from "./ReturnBook";
import { getSession } from "@/lib/getSession";
import ReIssueBook from "./ReIssueBook";

interface BookIssueProp {
  bookId: string;
  issueId: any;
  imageUrl: string;
  title: string;
  author: string;
  issueDate: string;
  issueTime: string;
  dueDate: string;
}

const Issue = async ({
  bookId,
  issueId,
  imageUrl,
  title,
  author,
  issueDate,
  issueTime,
  dueDate,
}: BookIssueProp) => {
  const session = await getSession();
  const email = session?.user?.email as string;
  const issueIdString = issueId.toString()

  const returnParams = {
    bookId: bookId,
    issueId: issueIdString,
    userEmail: email,
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
      <div className="flex gap-3 mt-2">
        <Clock3Icon className="size-5 text-orange-600" />
        <p className="font-old text-orange-600">Return before {dueDate}</p>
      </div>

      <div className="flex justify-between mt-6">
        <ReIssueBook issueId={issueIdString}/>
        <ReturnBook {...returnParams} />
      </div>
    </div>
  );
};

export default Issue;
