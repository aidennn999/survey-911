"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {
 FiMail,
 FiLock,
 FiUser,
 FiPhone,
 FiAlertCircle,
 FiCheckCircle,
} from "react-icons/fi";

export default function RegisterPage() {
 const [formData, setFormData] = useState({
  fullname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
 });
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");
 const [loading, setLoading] = useState(false);
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
  setError("");
  setSuccess("");

  // Validasi
  if (formData.password !== formData.confirmPassword) {
   setError("Passwords do not match");
   setLoading(false);
   return;
  }

  if (formData.password.length < 6) {
   setError("Password must be at least 6 characters long");
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

   if (data.status) {
    setSuccess(
     "Registration successful! Please check your email for verification."
    );
    setFormData({
     fullname: "",
     email: "",
     phone: "",
     password: "",
     confirmPassword: "",
    });

    // Redirect ke halaman verifikasi atau login setelah 3 detik
    setTimeout(() => {
     router.push("/login");
    }, 3000);
   } else {
    setError(data.message || "Registration failed");
   }
  } catch (error) {
   setError("An error occurred during registration");
   console.error("Registration error:", error);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-md w-full space-y-8">
    <div>
     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Create Admin Account
     </h2>
     <p className="mt-2 text-center text-sm text-gray-600">
      Sign up to manage customer messages
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

     {success && (
      <div className="rounded-md bg-green-50 p-4">
       <div className="flex">
        <FiCheckCircle className="h-5 w-5 text-green-400" />
        <div className="ml-3">
         <h3 className="text-sm font-medium text-green-800">{success}</h3>
        </div>
       </div>
      </div>
     )}

     <div className="rounded-md shadow-sm -space-y-px">
      {/* Full Name */}
      <div>
       <label
        htmlFor="fullname"
        className="sr-only">
        Full Name
       </label>
       <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
         <FiUser className="h-5 w-5 text-gray-400" />
        </div>
        <input
         id="fullname"
         name="fullname"
         type="text"
         autoComplete="name"
         required
         value={formData.fullname}
         onChange={handleChange}
         className="relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
         placeholder="Full Name"
        />
       </div>
      </div>

      {/* Email */}
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
         value={formData.email}
         onChange={handleChange}
         className="relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
         placeholder="Email address"
        />
       </div>
      </div>

      {/* Phone */}
      <div>
       <label
        htmlFor="phone"
        className="sr-only">
        Phone Number
       </label>
       <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
         <FiPhone className="h-5 w-5 text-gray-400" />
        </div>
        <input
         id="phone"
         name="phone"
         type="tel"
         autoComplete="tel"
         required
         value={formData.phone}
         onChange={handleChange}
         className="relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
         placeholder="Phone Number"
        />
       </div>
      </div>

      {/* Password */}
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
         autoComplete="new-password"
         required
         value={formData.password}
         onChange={handleChange}
         className="relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
         placeholder="Password"
        />
       </div>
      </div>

      {/* Confirm Password */}
      <div>
       <label
        htmlFor="confirmPassword"
        className="sr-only">
        Confirm Password
       </label>
       <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
         <FiLock className="h-5 w-5 text-gray-400" />
        </div>
        <input
         id="confirmPassword"
         name="confirmPassword"
         type="password"
         autoComplete="new-password"
         required
         value={formData.confirmPassword}
         onChange={handleChange}
         className="relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
         placeholder="Confirm Password"
        />
       </div>
      </div>
     </div>

     <div className="flex items-center justify-between">
      <div className="text-sm">
       <Link
        href="/login"
        className="font-medium text-blue-600 hover:text-blue-500">
        Already have an account? Sign in
       </Link>
      </div>
     </div>

     <div>
      <button
       type="submit"
       disabled={loading}
       className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
       {loading ? "Creating Account..." : "Create Account"}
      </button>
     </div>
    </form>
   </div>
  </div>
 );
}
