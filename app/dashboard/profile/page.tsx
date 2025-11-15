import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function ProfilePage() {
 const session = await getServerSession(authOptions);

 if (!session) {
  redirect("/auth/login");
 }

 return (
  <div className="min-h-screen bg-gray-50">
   <header className="bg-white shadow">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="flex justify-between items-center py-6">
      <div>
       <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
       <p className="text-gray-600 mt-1">Manage your account settings</p>
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

   <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
    <div className="px-4 py-6 sm:px-0">
     <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
        Personal Information
       </h3>

       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
         <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
         </label>
         <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
          {session.user?.name || "Not set"}
         </p>
        </div>

        <div>
         <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
         </label>
         <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
          {session.user?.email}
         </p>
        </div>

        <div>
         <label className="block text-sm font-medium text-gray-700 mb-2">
          Role
         </label>
         <p className="text-sm">
          <span
           className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            session.user?.role === "admin"
             ? "bg-red-100 text-red-800"
             : "bg-blue-100 text-blue-800"
           }`}>
           {session.user?.role || "member"}
          </span>
         </p>
        </div>

        <div>
         <label className="block text-sm font-medium text-gray-700 mb-2">
          User ID
         </label>
         <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border font-mono text-xs">
          {session.user?.id}
         </p>
        </div>
       </div>

       <div className="mt-8 border-t border-gray-200 pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">
         Account Actions
        </h4>
        <div className="space-y-3">
         <button className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 rounded-md border border-blue-200">
          Change Password
         </button>
         <button className="w-full text-left px-4 py-3 text-sm text-yellow-600 hover:bg-yellow-50 rounded-md border border-yellow-200">
          Update Email Address
         </button>
         <button className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-md border border-red-200">
          Delete Account
         </button>
        </div>
       </div>
      </div>
     </div>
    </div>
   </main>
  </div>
 );
}
