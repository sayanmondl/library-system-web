"use client";

import { useState } from "react";
import { reIssueBook } from "@/lib/issue";
import Toast from "./Toast";
import { useRouter } from "next/navigation";

const ReIssueBook = ({ issueId }: { issueId: string }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleReIssueBook = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await reIssueBook(issueId);
      setMessage(result.message);
      setSuccess(true);
    } catch (err) {
      setError("Failed to re-issue the book. Please try again.");
      setMessage(error as string);
    } finally {
      router.refresh();
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleReIssueBook} className="button-white" disabled={loading}>
        {loading ? "processing..." : "re-issue"}
      </button>

      {error && <p className="error">{error}</p>}
      {success && <Toast message={message} onClose={() => setSuccess(null)} />}
    </div>
  );
};

export default ReIssueBook;
