import Image from "next/image";
import React from "react";

const bookInfo = {
  cover: {
    url: "/image_cover.jpg",
  },
  book_id: "mahabharata",
  title: "Mahabharata",
  author: "Vyasa",
  description:
    "The Mahābhārata (Sanskrit: महाभारतम्) is one of the two major Smriti texts and Sanskrit epics of ancient India...",
  language: "Sanskrit",
  period: "3100 - 1200 BCE",
  chapters: 18,
  stock: 20,
  date_issued: "10 October 2024",
  time_issued: "10:45AM",
};

interface ReturnCardProps {
  handleCloseIssue: () => void;
}

const ReturnCard: React.FC<ReturnCardProps> = ({ handleCloseIssue }) => {
  return (
    <div className="fixed border left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6">
      <div className="flex">
        <Image
          src={bookInfo.cover.url}
          width={256}
          height={320}
          alt="Cover Image"
          className="w-64 h-80 object-cover border"
        />
        <div className="px-8 py-4">
          <h1>{bookInfo.title}</h1>
          <h2 className="text-black-300 mb-14">{bookInfo.author}</h2>

          <p className="mb-2 font-old font-bold">
            <span>Date Issued - </span>
            <span className="font-thin italic">{bookInfo.date_issued}</span>
          </p>
          <p className="mb-2 font-old font-bold">
            <span>Time - </span>
            <span className="font-thin italic">{bookInfo.time_issued}</span>
          </p>
          <p className="mb-2 font-old font-bold">
            <span>Duration - </span>
            <span className="font-thin italic">{"10 days 12 hrs 15 mins"}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <button className="button-white" onClick={handleCloseIssue}>
          cancel
        </button>
        <button className="button-black2">re-issue</button>
        <button className="button-black2">return</button>
      </div>
    </div>
  );
};

export default ReturnCard;
