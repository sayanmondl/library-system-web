"use client";

import { useState } from "react";
import { createIssue, IssueProp } from "@/lib/issue";
import Toast from "./Toast";
import { useRouter } from "next/navigation";

const IssueBook = (params: IssueProp) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleIssueBook = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await createIssue(params);
      setMessage(result.message);
      setSuccess(true);
    } catch (err) {
      setError("Failed to issue the book. Please try again.");
      setMessage(error as string);
    } finally {
      router.refresh();
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleIssueBook} className="button-black" disabled={loading}>
        {loading ? "Issuing..." : "Issue"}
      </button>

      {error && <p className="error">{error}</p>}
      {success && <Toast message={"Book issued successfully"} onClose={() => setSuccess(null)} />}
    </div>
  );
};

export default IssueBook;
