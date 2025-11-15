import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
 const session = await getServerSession(authOptions);

 if (!session) {
  redirect("/auth/login");
 }

 return (
  <div className="min-h-screen bg-gray-50">
   {/* Header */}
   <header className="bg-white shadow">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="flex justify-between items-center py-6">
      <div>
       <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
       <p className="text-gray-600 mt-1">
        Welcome back, {session.user?.name || session.user?.email}!
       </p>
       {session.user?.role === "admin" && (
        <>
         <Link
          href="/dashboard/admin/messages"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
          View Messages
         </Link>
         <Link
          href="/dashboard/admin"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Admin Panel
         </Link>
        </>
       )}
      </div>
      <div className="flex items-center space-x-4">
       <span className="text-sm text-gray-700">{session.user?.email}</span>
       <LogoutButton />
      </div>
     </div>
    </div>
   </header>

   {/* Main Content */}
   <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div className="px-4 py-6 sm:px-0">
     {/* Stats Grid */}
     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
      <div className="bg-white overflow-hidden shadow rounded-lg">
       <div className="p-5">
        <div className="flex items-center">
         <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
           <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth={2}
             d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
           </svg>
          </div>
         </div>
         <div className="ml-5 w-0 flex-1">
          <dl>
           <dt className="text-sm font-medium text-gray-500 truncate">
            Total Users
           </dt>
           <dd className="text-lg font-medium text-gray-900">1,234</dd>
          </dl>
         </div>
        </div>
       </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
       <div className="p-5">
        <div className="flex items-center">
         <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
           <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth={2}
             d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
           </svg>
          </div>
         </div>
         <div className="ml-5 w-0 flex-1">
          <dl>
           <dt className="text-sm font-medium text-gray-500 truncate">
            Active Sessions
           </dt>
           <dd className="text-lg font-medium text-gray-900">567</dd>
          </dl>
         </div>
        </div>
       </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
       <div className="p-5">
        <div className="flex items-center">
         <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
           <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth={2}
             d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
           </svg>
          </div>
         </div>
         <div className="ml-5 w-0 flex-1">
          <dl>
           <dt className="text-sm font-medium text-gray-500 truncate">
            Growth
           </dt>
           <dd className="text-lg font-medium text-gray-900">+24.5%</dd>
          </dl>
         </div>
        </div>
       </div>
      </div>
     </div>

     {/* Quick Actions */}
     <div className="bg-white shadow rounded-lg mb-8">
      <div className="px-4 py-5 sm:p-6">
       <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
        Quick Actions
       </h3>
       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
         href="/dashboard/profile"
         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
         Edit Profile
        </Link>
        <Link
         href="/dashboard/settings"
         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
         Settings
        </Link>
        {session.user?.role === "admin" && (
         <Link
          href="/dashboard/admin"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Admin Panel
         </Link>
        )}
       </div>
      </div>
     </div>

     {/* Recent Activity */}
     <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
        Recent Activity
       </h3>
       <div className="space-y-4">
        <div className="flex items-center space-x-3">
         <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <svg
           className="w-4 h-4 text-blue-600"
           fill="none"
           stroke="currentColor"
           viewBox="0 0 24 24">
           <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
           />
          </svg>
         </div>
         <div>
          <p className="text-sm text-gray-900">You logged in to the system</p>
          <p className="text-sm text-gray-500">Just now</p>
         </div>
        </div>
        <div className="flex items-center space-x-3">
         <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <svg
           className="w-4 h-4 text-green-600"
           fill="none"
           stroke="currentColor"
           viewBox="0 0 24 24">
           <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
           />
          </svg>
         </div>
         <div>
          <p className="text-sm text-gray-900">Your account was verified</p>
          <p className="text-sm text-gray-500">2 hours ago</p>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </main>
  </div>
 );
}
