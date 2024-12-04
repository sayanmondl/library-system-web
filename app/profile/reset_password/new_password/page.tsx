import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

const NewPassword = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  } else {
    return (
      <section className="w-96 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <form action={`/login`} method="POST">
          <div className="border p-4">
            <p className="text-center mt-4">new password</p>
            <input
              className="outline-none border p-2 font-old italic my-2 w-full"
              type="password"
              name="password"
            />
            <p className="text-center mt-4">repeat ...</p>
            <input
              className="outline-none border p-2 font-old italic my-2 w-full"
              type="password"
              name="password"
            />
          </div>

          <div className="flex justify-center mt-10">
            <button type="submit" className="button-black2">continue</button>
          </div>
        </form>
      </section>
    );
  }
};

export default NewPassword;
