"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import Toast from "./Toast";

interface ConfirmationProps {
  message: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

function Confirmation({ message, onClose, onConfirm }: ConfirmationProps) {
  return (
    <div className="border bg-white fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4">
      <h2 className="font-old">{message}</h2>
      <div className="flex justify-between mt-8 gap-5">
        <button onClick={onClose} className="button-white">
          Cancel
        </button>
        <button onClick={onConfirm} className="button-red">
          Confirm!
        </button>
      </div>
    </div>
  );
}

export default function DeleteAccount({ userId }: { userId: string }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`/api/user/delete/${userId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setToastMessage(data.message);
      if (data.success) {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/");
      } else {
        setToastMessage(data.message);
      }
    } catch (error) {
      setToastMessage("There was an error deleting your account");
      console.error("Error deleting account:", error);
    }
  };

  return (
    <>
      <button
        className="button-red-nw w-64 flex justify-around"
        onClick={() => setShowConfirmation(true)}
      >
        Delete account
        <Trash className="size-5 mt-0.5" />
      </button>
      {showConfirmation && (
        <Confirmation
          message="Are you sure that you want to delete your account?"
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleDeleteAccount}
        />
      )}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </>
  );
}
