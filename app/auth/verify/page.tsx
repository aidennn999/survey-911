"use client";

import {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";

export default function VerifyPage() {
 const [otp, setOtp] = useState(["", "", "", "", "", ""]);
 const [email, setEmail] = useState("");
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState({type: "", text: ""});
 const [resendCooldown, setResendCooldown] = useState(0);
 const router = useRouter();
 const searchParams = useSearchParams();

 useEffect(() => {
  const emailParam = searchParams.get("email");
  if (emailParam) {
   setEmail(decodeURIComponent(emailParam));
  } else {
   router.push("/auth/register");
  }
 }, [searchParams, router]);

 useEffect(() => {
  if (resendCooldown > 0) {
   const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
   return () => clearTimeout(timer);
  }
 }, [resendCooldown]);

 const handleOtpChange = (element: HTMLInputElement, index: number) => {
  if (isNaN(Number(element.value))) return false;

  const newOtp = [...otp];
  newOtp[index] = element.value;
  setOtp(newOtp);

  // Focus next input
  if (element.value && element.nextSibling) {
   (element.nextSibling as HTMLInputElement).focus();
  }
 };

 const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  index: number
 ) => {
  if (e.key === "Backspace" && !otp[index] && e.currentTarget.previousSibling) {
   (e.currentTarget.previousSibling as HTMLInputElement).focus();
  }
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage({type: "", text: ""});

  const otpString = otp.join("");

  if (otpString.length !== 6) {
   setMessage({type: "error", text: "Please enter the 6-digit OTP"});
   setLoading(false);
   return;
  }

  try {
   const response = await fetch("/api/auth/verify-otp", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     email,
     otp: otpString,
    }),
   });

   const data = await response.json();

   if (data.status) {
    setMessage({
     type: "success",
     text: "Verification successful! Redirecting to login...",
    });
    setTimeout(() => {
     router.push("/auth/login");
    }, 2000);
   } else {
    setMessage({type: "error", text: data.message});
   }
  } catch (error) {
   setMessage({type: "error", text: "Verification failed. Please try again."});
  } finally {
   setLoading(false);
  }
 };

 const handleResendOtp = async () => {
  if (resendCooldown > 0) return;

  try {
   setLoading(true);
   const response = await fetch("/api/auth/resend-otp", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({email}),
   });

   const data = await response.json();

   if (data.status) {
    setMessage({type: "success", text: "New verification code sent!"});
    setResendCooldown(60);
   } else {
    setMessage({type: "error", text: data.message});
   }
  } catch (error) {
   setMessage({type: "error", text: "Failed to resend code"});
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-md w-full space-y-8">
    <div>
     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Verify your email
     </h2>
     <p className="mt-2 text-center text-sm text-gray-600">
      We sent a verification code to {email}
     </p>
    </div>

    <form
     className="mt-8 space-y-6"
     onSubmit={handleSubmit}>
     <div className="flex justify-center space-x-2">
      {otp.map((digit, index) => (
       <input
        key={index}
        type="text"
        maxLength={1}
        value={digit}
        onChange={(e) => handleOtpChange(e.target, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        onFocus={(e) => e.target.select()}
        className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
       />
      ))}
     </div>

     {message.text && (
      <div
       className={`rounded-md p-4 ${
        message.type === "error"
         ? "bg-red-50 border border-red-200"
         : "bg-green-50 border border-green-200"
       }`}>
       <div
        className={`text-sm ${
         message.type === "error" ? "text-red-800" : "text-green-800"
        }`}>
        {message.text}
       </div>
      </div>
     )}

     <div className="flex flex-col space-y-4">
      <button
       type="submit"
       disabled={loading}
       className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
       {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <div className="text-center">
       <button
        type="button"
        onClick={handleResendOtp}
        disabled={resendCooldown > 0 || loading}
        className="text-sm text-blue-600 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
        {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"}
       </button>
      </div>

      <div className="text-center">
       <Link
        href="/auth/register"
        className="text-sm text-gray-600 hover:text-gray-500">
        Use different email
       </Link>
      </div>
     </div>
    </form>
   </div>
  </div>
 );
}
