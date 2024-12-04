import { getSession } from "@/lib/getSession";
import SignUpForm from "./SignUpForm";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) {
    redirect("/");
  }
  return <SignUpForm />;
};

export default Page;
