import React from "react";
import ProfileCard from "./ProfileCard";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { getUserData } from "@/lib/user";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  } else {
    const userData = await getUserData(user?.id as string);
    const userProfileInfo = {
      id: user?.id as string,
      name: userData?.name,
      email: userData?.email,
    };

    return (
      <>
        <div className="2xl:mx-64 xll:mx-48 xl:mx-32 lg:mx-16 xm:mx-10 md:mx-8 sm:mx-4 mx-2">
          <ProfileCard data={userProfileInfo} />
        </div>

        <div className="flex flex-col items-center gap-4 mt-10 px-6">
          <h2 className="font-old text-center">
            Click the button below to see the books you have currently issued:
          </h2>
          <Link href="/profile/current_issues">
            <button className="button-black-nw w-44 flex items-center justify-around mb-10">
              current issues
              <ArrowRight />
            </button>
          </Link>
          <h2 className="font-old text-center">
            Click the button below to see your issue history:
          </h2>
          <Link href="/profile/issues">
            <button className="button-black-nw w-32 flex items-center justify-around mb-10">
              issues
              <ArrowRight />
            </button>
          </Link>
        </div>
      </>
    );
  }
};

export default Page;
