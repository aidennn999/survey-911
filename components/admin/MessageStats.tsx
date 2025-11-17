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
   title: "Total Pesan",
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
   title: "Belum Dibaca",
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
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
     />
    </svg>
   ),
  },
  {
   title: "Sudah Dibaca",
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
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
     />
    </svg>
   ),
  },
  {
   title: "Sudah Dibalas",
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
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
   {statCards.map((stat, index) => (
    <div
     key={index}
     className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
     <div className="flex items-center justify-between">
      <div>
       <p className="text-sm font-medium text-gray-600">{stat.title}</p>
       <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
      </div>
      <div className={`${stat.color} rounded-full p-3`}>{stat.icon}</div>
     </div>
    </div>
   ))}
  </div>
 );
}
