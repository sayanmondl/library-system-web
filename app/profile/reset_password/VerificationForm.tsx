"use client";

import { useState } from "react";
import { resetPassword, sendOTP, verifyOTP } from "@/action/user";
import Link from "next/link";
import Toast from "@/app/components/Toast";
import { redirect } from "next/navigation";

export default function VerificationForm() {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOTPSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage("Please enter your email address");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    const result = await sendOTP(formData);
    setMessage(result.message);
    if (result.success) {
      setOTPSent(true);
    }
    setIsLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    setIsVerified(false);
    e.preventDefault();
    if (!otp.trim()) {
      setMessage("Please enter the OTP");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", otp);
    const result = await verifyOTP(formData);
    setMessage(result.message);
    if (result.success) {
      setOTPSent(false);
      setOTP("");
      setIsVerified(true);

      sessionStorage.setItem("verifiedEmail", email);
    }

    setIsLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const password = (e.target as HTMLFormElement).password.value;
    const passwordRepeat = (e.target as HTMLFormElement).password_repeat.value;

    if (!password.trim() || !passwordRepeat.trim()) {
      setMessage("Please fill in both password fields");
      return;
    }

    if (password !== passwordRepeat) {
      setMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);

    const email = sessionStorage.getItem("verifiedEmail");
    if (!email) {
      setMessage("No verified email found. Please restart the process.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_repeat", passwordRepeat);

    const result = await resetPassword(formData);

    setMessage(result.message);
    if (result.success) {
      sessionStorage.removeItem("verifiedEmail");
      redirect("/profile");
    }
    setIsLoading(false);
  };

  return (
    <main>
      <div className="w-96 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="font-old italic text-center mb-4">we shall send you an OTP to verify</p>
        {isVerified ? (
          <form onSubmit={handleResetPassword}>
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
                name="password_repeat"
              />
            </div>

            <div className="flex justify-center mt-10">
              <button type="submit" className="button-black2">
                continue
              </button>
            </div>
          </form>
        ) : (
          <div>
            {!otpSent ? (
              <form onSubmit={handleSendOTP}>
                <div className="border p-4 flex flex-col items-center">
                  <p className="text-center">enter your e-mail</p>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="outline-none border p-2 font-old italic my-2 w-full"
                  />
                  <button type="submit" className="button-black2 mt-4" disabled={isLoading}>
                    {isLoading ? "Sending..." : "get OTP"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP}>
                <div>
                  <p className="text-center mt-8">enter the OTP</p>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    placeholder="Enter OTP"
                    required
                    className="outline-none border p-2 font-old italic my-2 w-full"
                  />
                </div>
                <div className="flex justify-between mt-10">
                  <Link href={`/profile`}>
                    <button className="button-white" type="button">
                      cancel
                    </button>
                  </Link>
                  <button type="submit" className="button-black2" disabled={isLoading}>
                    {isLoading ? "verifying..." : "verify"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
      {message && <Toast message={message} onClose={() => setMessage("")} />}
    </main>
  );
}
