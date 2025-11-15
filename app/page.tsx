"use client";

import {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Sidebar from "@/components/Sidebar";
import MessageList from "@/components/MessageList";
import {Message} from "@/types/message";
import {FiLoader, FiRefreshCw} from "react-icons/fi";

export default function AdminDashboard() {
 const {data: session, status} = useSession();
 const router = useRouter();
 const [messages, setMessages] = useState<Message[]>([]);
 const [loading, setLoading] = useState(true);
 const [refreshing, setRefreshing] = useState(false);
 const [sidebarOpen, setSidebarOpen] = useState(false);

 useEffect(() => {
  if (status === "unauthenticated") {
   router.push("/login");
  }
 }, [status, router]);

 useEffect(() => {
  if (session) {
   fetchMessages();
  }
 }, [session]);

 const fetchMessages = async () => {
  try {
   const response = await fetch("/api/messages");
   if (response.ok) {
    const data = await response.json();
    setMessages(data);
   }
  } catch (error) {
   console.error("Error fetching messages:", error);
  } finally {
   setLoading(false);
   setRefreshing(false);
  }
 };

 const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this message?")) {
   return;
  }

  try {
   const response = await fetch(`/api/messages?id=${id}`, {
    method: "DELETE",
   });

   if (response.ok) {
    setMessages(messages.filter((msg) => msg.id !== id));
   } else {
    alert("Failed to delete message");
   }
  } catch (error) {
   console.error("Error deleting message:", error);
   alert("Failed to delete message");
  }
 };

 const handleRefresh = () => {
  setRefreshing(true);
  fetchMessages();
 };

 const handleToggleRead = async (id: string, read: boolean) => {
  // Implement toggle read functionality if needed
  console.log("Toggle read:", id, read);
 };

 if (status === "loading" || loading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <FiLoader className="w-8 h-8 text-blue-600 animate-spin" />
   </div>
  );
 }

 if (!session) {
  return null;
 }

 const unreadCount = messages.filter((msg) => !msg.read).length;

 return (
  <div className="flex h-screen bg-gray-100">
   <Sidebar
    isOpen={sidebarOpen}
    setIsOpen={setSidebarOpen}
   />

   <div className="flex-1 flex flex-col overflow-hidden">
    <header className="bg-white shadow-sm z-10">
     <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-900">
       Customer Messages
       {unreadCount > 0 && (
        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
         {unreadCount} unread
        </span>
       )}
      </h1>

      <button
       onClick={handleRefresh}
       disabled={refreshing}
       className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
       <FiRefreshCw
        className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
       />
       Refresh
      </button>
     </div>
    </header>

    <main className="flex-1 overflow-y-auto">
     <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <MessageList
       messages={messages}
       onDelete={handleDelete}
       onToggleRead={handleToggleRead}
      />
     </div>
    </main>
   </div>
  </div>
 );
}
