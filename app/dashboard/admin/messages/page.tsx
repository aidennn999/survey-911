import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import {
 getAnonymousMessages,
 getMessageStats,
 updateMessageStatus,
 deleteAnonymousMessage,
} from "@/lib/utils/contactService";
import {AnonymousMessage} from "@/types/contact";
import MessagesTable from "@/components/admin/MessageTable";
import MessageStats from "@/components/admin/MessageStats";

export default async function AdminMessagesPage() {
 const session = await getServerSession(authOptions);

 // Check if user is admin
 if (!session || session.user?.role !== "admin") {
  redirect("/dashboard/unauthorized");
 }

 const messages = await getAnonymousMessages();
 const stats = await getMessageStats();

 return (
  <div className="min-h-screen bg-gray-50">
   {/* Header */}
   <header className="bg-white shadow">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="flex justify-between items-center py-6">
      <div>
       <h1 className="text-3xl font-bold text-gray-900">Admin Messages</h1>
       <p className="text-gray-600 mt-1">
        Manage anonymous messages from customers
       </p>
      </div>
      <div className="flex items-center space-x-4">
       <Link
        href="/dashboard"
        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        Back to Dashboard
       </Link>
       <LogoutButton />
      </div>
     </div>
    </div>
   </header>

   {/* Main Content */}
   <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div className="px-4 py-6 sm:px-0">
     {/* Statistics */}
     <MessageStats stats={stats} />

     {/* Messages Table */}
     <div className="mt-8">
      <MessagesTable messages={messages} />
     </div>

     {/* Empty State */}
     {messages.length === 0 && (
      <div className="text-center py-12">
       <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
        <svg
         className="w-12 h-12 text-gray-400"
         fill="none"
         stroke="currentColor"
         viewBox="0 0 24 24">
         <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
         />
        </svg>
       </div>
       <h3 className="mt-4 text-lg font-medium text-gray-900">
        No messages yet
       </h3>
       <p className="mt-2 text-sm text-gray-500">
        Anonymous messages from customers will appear here.
       </p>
      </div>
     )}
    </div>
   </main>
  </div>
 );
}
