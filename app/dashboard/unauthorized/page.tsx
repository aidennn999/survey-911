import Link from "next/link";

export default function UnauthorizedPage() {
 return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
   <div className="max-w-md w-full text-center">
    <div className="bg-white shadow rounded-lg p-8">
     <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg
       className="w-8 h-8 text-yellow-600"
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24">
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
       />
      </svg>
     </div>
     <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
     <p className="text-gray-600 mb-6">
      You don't have permission to access this page. Please contact an
      administrator if you believe this is an error.
     </p>
     <div className="space-y-3">
      <Link
       href="/dashboard"
       className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
       Back to Dashboard
      </Link>
      <Link
       href="/auth/login"
       className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
       Sign in with different account
      </Link>
     </div>
    </div>
   </div>
  </div>
 );
}
