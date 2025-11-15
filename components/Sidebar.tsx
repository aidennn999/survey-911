"use client";

import {signOut} from "next-auth/react";
import {FiMessageSquare, FiLogOut, FiMenu} from "react-icons/fi";

interface SidebarProps {
 isOpen: boolean;
 setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({isOpen, setIsOpen}: SidebarProps) {
 return (
  <>
   {/* Mobile menu button */}
   <button
    className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-lg"
    onClick={() => setIsOpen(!isOpen)}>
    <FiMenu className="w-6 h-6" />
   </button>

   {/* Sidebar */}
   <div
    className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out
        ${
         isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0
      `}>
    <div className="flex items-center justify-center h-16 bg-gray-900">
     <h1 className="text-white text-xl font-bold">Admin Panel</h1>
    </div>

    <nav className="mt-8">
     <div className="px-4 space-y-2">
      <a
       href="#"
       className="flex items-center px-4 py-2 text-gray-100 bg-gray-700 rounded-lg">
       <FiMessageSquare className="w-5 h-5 mr-3" />
       Messages
      </a>

      <button
       onClick={() => signOut()}
       className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
       <FiLogOut className="w-5 h-5 mr-3" />
       Logout
      </button>
     </div>
    </nav>
   </div>

   {/* Overlay for mobile */}
   {isOpen && (
    <div
     className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
     onClick={() => setIsOpen(false)}
    />
   )}
  </>
 );
}
