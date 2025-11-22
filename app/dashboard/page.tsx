import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import MessagesTable from "@/components/admin/MessageTable";
import {getAnonymousMessages} from "@/lib/utils/contactService";
import {AnonymousMessage} from "@/types/contact";
import {IoPersonSharp} from "react-icons/io5";

export default async function DashboardPage() {
 const session = await getServerSession(authOptions);

 if (!session) {
  redirect("/auth/login");
 }

 let messages: AnonymousMessage[] = [];
 if (session.user?.role === "admin") {
  messages = await getAnonymousMessages();
 }

 return (
  <div className="min-h-screen bg-[#ffebd2]">
   <header className="bg-[#fc6f2f] shadow">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="flex justify-between items-center py-3">
      <div>
       <h1 className="text-3xl font-bold text-white">Dashboard</h1>
       <p className="text-white/80 mt-1">
        Welcome back, {session.user?.name || session.user?.email}!
       </p>
      </div>
      <div className="flex items-center space-x-4">
       <Link
        href="/dashboard/profile"
        className="inline-flex items-center text-xl text-white ">
        <IoPersonSharp />
       </Link>
       <LogoutButton />
      </div>
     </div>
    </div>
   </header>

   {/* Main Content */}
   <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
    <div className="px-4 py-6 sm:px-0">
     {session.user?.role === "admin" && (
      <div className="mb-8">
       <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#fc6f2f]">Messages</h2>
        <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
         {messages.length} messages
        </span>
       </div>
       <MessagesTable messages={messages} />
      </div>
     )}
    </div>
   </main>
  </div>
 );
}
