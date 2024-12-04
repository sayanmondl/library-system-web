"use client"

import { changeEmail } from "@/action/user";
import Toast from "@/app/components/Toast";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function ChangeEmailForm() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        const result = await changeEmail(formData);
        if (result.success) {
          setToastMessage(result.message);
          router.push('/profile');
        } else {
          setToastMessage(result.message);
        }
      } catch (error) {
        setToastMessage("An unexpected error occurred while changing E-mail");
      }
    });
  };

  return (
    <>
      <section className="w-96 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <form onSubmit={handleSubmit} method="POST">
          <div className="border p-4">
            <p className="text-center">enter your e-mail</p>
            <input
              className="outline-none border p-2 font-old italic my-2 w-full"
              type="email"
              name="old-email"
              required
              aria-required="true"
            />
            <p className="text-center">enter 'new' e-mail</p>
            <input
              className="outline-none border p-2 font-old italic my-2 w-full"
              type="email"
              name="new-email"
              required
              aria-required="true"
            />
          </div>

          <div className="flex justify-center mt-10">
            <button type="submit" className="button-black2">
              {isPending ? 'changing...' : 'continue'}
            </button>
          </div>
        </form>
      </section>
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </>
  );
}
