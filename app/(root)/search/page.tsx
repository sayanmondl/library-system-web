import ListSearchedBooks from "@/app/components/ListSearchedBooks";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListSearchedBooks />
    </Suspense>
  );
};

export default Page;
