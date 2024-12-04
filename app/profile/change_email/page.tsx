import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import ChangeEmailForm from "./ChangeEmailForm";

const Page = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  } else {
    return <ChangeEmailForm />
  }
};

export default Page;
