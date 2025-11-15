"use client";

import {useState} from "react";
import {AnonymousMessage} from "@/types/contact";
import {
 updateMessageStatus,
 deleteAnonymousMessage,
} from "@/lib/utils/contactService";

interface MessagesTableProps {
 messages: AnonymousMessage[];
}

export default function MessagesTable({messages}: MessagesTableProps) {
 const [localMessages, setLocalMessages] =
  useState<AnonymousMessage[]>(messages);

 const handleStatusChange = async (
  messageId: string,
  newStatus: "unread" | "read" | "replied"
 ) => {
  const success = await updateMessageStatus(messageId, newStatus);
  if (success) {
   setLocalMessages((prev) =>
    prev.map((msg) =>
     msg.id === messageId ? {...msg, status: newStatus} : msg
    )
   );
  }
 };

 const handleDelete = async (messageId: string) => {
  if (confirm("Are you sure you want to delete this message?")) {
   const success = await deleteAnonymousMessage(messageId);
   if (success) {
    setLocalMessages((prev) => prev.filter((msg) => msg.id !== messageId));
   }
  }
 };

 const getStatusBadge = (status: string) => {
  const baseClasses =
   "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

  switch (status) {
   case "unread":
    return `${baseClasses} bg-red-100 text-red-800`;
   case "read":
    return `${baseClasses} bg-yellow-100 text-yellow-800`;
   case "replied":
    return `${baseClasses} bg-green-100 text-green-800`;
   default:
    return `${baseClasses} bg-gray-100 text-gray-800`;
  }
 };

 const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
   year: "numeric",
   month: "short",
   day: "numeric",
   hour: "2-digit",
   minute: "2-digit",
  }).format(date);
 };

 if (localMessages.length === 0) {
  return null;
 }

 return (
  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
   <div className="px-4 py-5 sm:px-6">
    <h3 className="text-lg leading-6 font-medium text-gray-900">
     Anonymous Messages
    </h3>
    <p className="mt-1 max-w-2xl text-sm text-gray-500">
     Messages from anonymous customers
    </p>
   </div>

   <div className="border-t border-gray-200">
    <div className="overflow-x-auto">
     <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
       <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Subject
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Message
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Date
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Actions
        </th>
       </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
       {localMessages.map((message) => (
        <tr
         key={message.id}
         className="hover:bg-gray-50">
         <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
           {message.subject}
          </div>
          <div className="text-sm text-gray-500">From: {message.name}</div>
         </td>
         <td className="px-6 py-4">
          <div className="text-sm text-gray-900 max-w-xs truncate">
           {message.message}
          </div>
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <span className={getStatusBadge(message.status)}>
           {message.status}
          </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(message.createdAt)}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex space-x-2">
           <select
            value={message.status}
            onChange={(e) =>
             handleStatusChange(
              message.id,
              e.target.value as "unread" | "read" | "replied"
             )
            }
            className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
           </select>
           <button
            onClick={() => handleDelete(message.id)}
            className="text-red-600 hover:text-red-900 text-xs">
            Delete
           </button>
          </div>
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   </div>
  </div>
 );
}
