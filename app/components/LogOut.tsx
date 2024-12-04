"use client";

import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ConfirmationProps {
  message: string;
  onClose: () => void;
}

function Confirmation({ message, onClose }: ConfirmationProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    const data = await res.json();

    if (data.success) {
      router.push("/");
      router.refresh();
    } else {
      console.error("Logout failed:", data.message);
    }
  };

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border bg-white p-4">
      <h2 className="font-old">{message}</h2>
      <div className="mt-8 flex justify-between gap-5">
        <button onClick={onClose} className="button-white">
          cancel
        </button>
        <button onClick={handleLogout} className="button-red">
          confirm!
        </button>
      </div>
    </div>
  );
}

export default function LogOut() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <button
        className="button-white-nw flex w-64 justify-around"
        onClick={() => setShowConfirmation(true)}
      >
        Log-Out
        <LogOutIcon className="mt-0.5 size-5" />
      </button>
      {showConfirmation && (
        <Confirmation
          message="Are you sure?"
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </>
  );
}
