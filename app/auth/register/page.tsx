"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
 const [formData, setFormData] = useState({
  fullname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
 });
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState({type: "", text: ""});
 const router = useRouter();

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
   ...formData,
   [e.target.name]: e.target.value,
  });
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage({type: "", text: ""});

  // Validation
  if (formData.password !== formData.confirmPassword) {
   setMessage({type: "error", text: "Passwords do not match"});
   setLoading(false);
   return;
  }

  if (formData.password.length < 6) {
   setMessage({type: "error", text: "Password must be at least 6 characters"});
   setLoading(false);
   return;
  }

  try {
   const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     fullname: formData.fullname,
     email: formData.email,
     phone: formData.phone,
     password: formData.password,
    }),
   });

   const data = await response.json();
   console.log("Registration response:", data);

   if (data.status) {
    // Check if the message indicates email failure
    if (data.message.includes("verification email failed")) {
     setMessage({
      type: "warning",
      text:
       "Registration successful but we couldn't send verification email. Please contact support or try logging in directly.",
     });
     // Still allow them to proceed to verification
     setTimeout(() => {
      router.push(`/auth/verify?email=${encodeURIComponent(formData.email)}`);
     }, 3000);
    } else {
     setMessage({
      type: "success",
      text:
       "Registration successful! Please check your email for verification code.",
     });
     setTimeout(() => {
      router.push(`/auth/verify?email=${encodeURIComponent(formData.email)}`);
     }, 2000);
    }
   } else {
    setMessage({
     type: "error",
     text: data.message || "Registration failed. Please try again.",
    });
   }
  } catch (error) {
   console.error("Registration error:", error);
   setMessage({
    type: "error",
    text: `Network error: ${
     error instanceof Error ? error.message : "Unknown error"
    }`,
   });
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-md w-full space-y-8">
    <div>
     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Create your account
     </h2>
     <p className="mt-2 text-center text-sm text-gray-600">
      Or{" "}
      <Link
       href="/auth/login"
       className="font-medium text-blue-600 hover:text-blue-500">
       sign in to your existing account
      </Link>
     </p>
    </div>
    <form
     className="mt-8 space-y-6"
     onSubmit={handleSubmit}>
     <div className="rounded-md shadow-sm -space-y-px">
      <div>
       <label
        htmlFor="fullname"
        className="sr-only">
        Full Name
       </label>
       <input
        id="fullname"
        name="fullname"
        type="text"
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder="Full Name"
        value={formData.fullname}
        onChange={handleChange}
       />
      </div>
      <div>
       <label
        htmlFor="email"
        className="sr-only">
        Email address
       </label>
       <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder="Email address"
        value={formData.email}
        onChange={handleChange}
       />
      </div>
      <div>
       <label
        htmlFor="phone"
        className="sr-only">
        Phone Number
       </label>
       <input
        id="phone"
        name="phone"
        type="tel"
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
       />
      </div>
      <div>
       <label
        htmlFor="password"
        className="sr-only">
        Password
       </label>
       <input
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
       />
      </div>
      <div>
       <label
        htmlFor="confirmPassword"
        className="sr-only">
        Confirm Password
       </label>
       <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
       />
      </div>
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

     <div>
      <button
       type="submit"
       disabled={loading}
       className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
       {loading ? "Creating account..." : "Create account"}
      </button>
     </div>
    </form>
   </div>
  </div>
 );
}
