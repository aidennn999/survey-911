"use client";

import {signOut} from "next-auth/react";
import {useState} from "react";
import {IoLogOutSharp} from "react-icons/io5";

export default function LogoutButton() {
 const [loading, setLoading] = useState(false);

 const handleLogout = async () => {
  setLoading(true);
  await signOut({callbackUrl: "/auth/login"});
 };

 return (
  <button
   onClick={handleLogout}
   disabled={loading}
   className="inline-flex items-center text-2xl text-white disabled:opacity-50 disabled:cursor-not-allowed">
   {loading ? (
    <>
     <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
      fill="none"
      viewBox="0 0 24 24">
      <circle
       className="opacity-25"
       cx="12"
       cy="12"
       r="10"
       stroke="currentColor"
       strokeWidth="4"></circle>
      <path
       className="opacity-75"
       fill="currentColor"
       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
     </svg>
     Logging out...
    </>
   ) : (
    <IoLogOutSharp />
   )}
  </button>
 );
}
