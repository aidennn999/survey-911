"use client";

import {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {FiMail, FiLock, FiAlertCircle} from "react-icons/fi";
import Link from "next/link";

export default function LoginPage() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);
 const router = useRouter();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
   const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
   });

   if (result?.error) {
    setError("Invalid credentials");
   } else {
    router.push("/");
   }
  } catch (error) {
   setError("An error occurred during login");
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-md w-full space-y-8">
    <div>
     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Admin Panel Login
     </h2>
     <p className="mt-2 text-center text-sm text-gray-600">
      Sign in to manage customer messages
     </p>
    </div>

    <form
     className="mt-8 space-y-6"
     onSubmit={handleSubmit}>
     {error && (
      <div className="rounded-md bg-red-50 p-4">
       <div className="flex">
        <FiAlertCircle className="h-5 w-5 text-red-400" />
        <div className="ml-3">
         <h3 className="text-sm font-medium text-red-800">{error}</h3>
        </div>
       </div>
      </div>
     )}

     <div className="rounded-md shadow-sm -space-y-px">
      <div>
       <label
        htmlFor="email"
        className="sr-only">
        Email address
       </label>
       <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
         <FiMail className="h-5 w-5 text-gray-400" />
        </div>
        <input
         id="email"
         name="email"
         type="email"
         autoComplete="email"
         required
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         className="relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
         placeholder="Email address"
        />
       </div>
      </div>
      <div>
       <label
        htmlFor="password"
        className="sr-only">
        Password
       </label>
       <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
         <FiLock className="h-5 w-5 text-gray-400" />
        </div>
        <input
         id="password"
         name="password"
         type="password"
         autoComplete="current-password"
         required
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         className="relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
         placeholder="Password"
        />
       </div>
      </div>
     </div>
     <div className="text-sm">
      <Link
       href="/register"
       className="font-medium text-blue-600 hover:text-blue-500">
       Don't have an account? Sign up
      </Link>
     </div>
     <div>
      <button
       type="submit"
       disabled={loading}
       className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
       {loading ? "Signing in..." : "Sign in"}
      </button>
     </div>
    </form>
   </div>
  </div>
 );
}
