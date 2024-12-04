import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import ChangeNameForm from "./ChangeNameForm";


const Page = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  } else {
    return <ChangeNameForm />
  }
};

export default Page;
