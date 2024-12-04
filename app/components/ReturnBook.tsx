"use client";

import { useState } from "react";
import { returnBook, ReturnProp } from "@/lib/issue";
import Toast from "./Toast";
import { useRouter } from "next/navigation";

const ReturnBook = (params: ReturnProp) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleReturnBook = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await returnBook(params);
      setMessage(result.message);
      setSuccess(true);
    } catch (err) {
      setError("Failed to return the book. Please try again.");
      setMessage(error as string);
    } finally {
      router.refresh();
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleReturnBook} className="button-black2" disabled={loading}>
        {loading ? "processing..." : "return"}
      </button>

      {error && <p className="error">{error}</p>}
      {success && <Toast message={message} onClose={() => setSuccess(null)} />}
    </div>
  );
};

export default ReturnBook;
