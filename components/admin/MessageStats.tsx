"use client";

interface MessageStatsProps {
 stats: {
  total: number;
  unread: number;
  read: number;
  replied: number;
 };
}

export default function MessageStats({stats}: MessageStatsProps) {
 const statCards = [
  {
   name: "Total Messages",
   value: stats.total,
   color: "bg-blue-500",
   icon: (
    <svg
     className="w-6 h-6 text-white"
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
   ),
  },
  {
   name: "Unread",
   value: stats.unread,
   color: "bg-red-500",
   icon: (
    <svg
     className="w-6 h-6 text-white"
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
   ),
  },
  {
   name: "Read",
   value: stats.read,
   color: "bg-green-500",
   icon: (
    <svg
     className="w-6 h-6 text-white"
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
   ),
  },
  {
   name: "Replied",
   value: stats.replied,
   color: "bg-purple-500",
   icon: (
    <svg
     className="w-6 h-6 text-white"
     fill="none"
     stroke="currentColor"
     viewBox="0 0 24 24">
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
     />
    </svg>
   ),
  },
 ];

 return (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
   {statCards.map((stat) => (
    <div
     key={stat.name}
     className="bg-white overflow-hidden shadow rounded-lg">
     <div className="p-5">
      <div className="flex items-center">
       <div className="flex-shrink-0">
        <div
         className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
         {stat.icon}
        </div>
       </div>
       <div className="ml-5 w-0 flex-1">
        <dl>
         <dt className="text-sm font-medium text-gray-500 truncate">
          {stat.name}
         </dt>
         <dd className="text-2xl font-bold text-gray-900">{stat.value}</dd>
        </dl>
       </div>
      </div>
     </div>
    </div>
   ))}
  </div>
 );
}
