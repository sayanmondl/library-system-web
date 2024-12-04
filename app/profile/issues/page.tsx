import { getSession } from "@/lib/getSession";
import { getUserIssues } from "@/lib/user";
import { redirect } from "next/navigation";
import DisplayIssueHistory from "@/app/components/DisplayIssueHistory";
import { Suspense } from "react";
import Loading from "@/app/loading";

const Page = async () => {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id as string;

  if (!user) {
    redirect("/login");
  } else {
    const issues = await getUserIssues(userId);
    return (
      <Suspense fallback={ <Loading />}>
        <section className="mx-2 sm:mx-4 md:mx-8 xm:mx-10 lg:mx-16 xl:mx-28 xll:mx-40">
          <DisplayIssueHistory issues={issues} />
        </section>
      </Suspense>
    );
  }
};

export default Page;
