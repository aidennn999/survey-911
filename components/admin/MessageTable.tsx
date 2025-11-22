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

export default function MessagesTable({
 messages: initialMessages,
}: MessagesTableProps) {
 const [messages, setMessages] = useState(initialMessages);
 const [selectedMessage, setSelectedMessage] =
  useState<AnonymousMessage | null>(null);

 const handleStatusUpdate = async (
  messageId: string,
  newStatus: "unread" | "read"
 ) => {
  const success = await updateMessageStatus(messageId, newStatus);
  if (success) {
   setMessages(
    messages.map((msg) =>
     msg.id === messageId ? {...msg, status: newStatus} : msg
    )
   );
  }
 };

 const handleDelete = async (messageId: string) => {
  if (confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
   const success = await deleteAnonymousMessage(messageId);
   if (success) {
    setMessages(messages.filter((msg) => msg.id !== messageId));
   }
  }
 };

 const getStatusColor = (status: string) => {
  switch (status) {
   case "unread":
    return "bg-red-100 text-red-800";
   case "read":
    return "bg-green-100 text-green-800";
   default:
    return "bg-gray-100 text-gray-800";
  }
 };

 const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("id-ID", {
   day: "numeric",
   month: "long",
   year: "numeric",
   hour: "2-digit",
   minute: "2-digit",
  }).format(date);
 };

 return (
  <>
   <div className="bg-white shadow-sm rounded-lg overflow-hidden">
    <div className="overflow-x-auto">
     <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
       <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Subjek
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Pesan
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Tanggal
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Aksi
        </th>
       </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
       {messages.map((message) => (
        <tr
         key={message.id}
         className="hover:bg-gray-50">
         <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
           {message.subject}
          </div>
         </td>
         <td className="px-6 py-4">
          <div className="text-sm text-gray-900 max-w-md truncate">
           {message.message}
          </div>
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <span
           className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
            message.status
           )}`}>
           {message.status === "unread" ? "Belum Dibaca" : "Sudah Dibaca"}
          </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(message.createdAt)}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
          <button
           onClick={() => setSelectedMessage(message)}
           className="text-blue-600 hover:text-blue-900">
           Lihat
          </button>
          <select
           value={message.status}
           onChange={(e) =>
            handleStatusUpdate(message.id, e.target.value as "unread" | "read")
           }
           className="text-sm border border-gray-300 rounded px-2 py-1">
           <option value="unread">Belum Dibaca</option>
           <option value="read">Sudah Dibaca</option>
          </select>
          <button
           onClick={() => handleDelete(message.id)}
           className="text-red-600 hover:text-red-900">
           Hapus
          </button>
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   </div>

   {/* Modal Detail Pesan */}
   {selectedMessage && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
     <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
       <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Detail Pesan</h3>
        <button
         onClick={() => setSelectedMessage(null)}
         className="text-gray-400 hover:text-gray-600">
         <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth={2}
           d="M6 18L18 6M6 6l12 12"
          />
         </svg>
        </button>
       </div>

       <div className="space-y-4">
        <div>
         <label className="block text-sm font-medium text-gray-700 mb-1">
          Subjek
         </label>
         <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded border">
          {selectedMessage.subject}
         </p>
        </div>

        <div>
         <label className="block text-sm font-medium text-gray-700 mb-1">
          Pesan
         </label>
         <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded border whitespace-pre-wrap">
          {selectedMessage.message}
         </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
           Status
          </label>
          <span
           className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
            selectedMessage.status
           )}`}>
           {selectedMessage.status === "unread"
            ? "Belum Dibaca"
            : "Sudah Dibaca"}
          </span>
         </div>

         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
           Tanggal
          </label>
          <p className="text-sm text-gray-900">
           {formatDate(selectedMessage.createdAt)}
          </p>
         </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
         <select
          value={selectedMessage.status}
          onChange={(e) => {
           handleStatusUpdate(
            selectedMessage.id,
            e.target.value as "unread" | "read"
           );
           setSelectedMessage({
            ...selectedMessage,
            status: e.target.value as "unread" | "read",
           });
          }}
          className="text-sm border border-gray-300 rounded px-3 py-2">
          <option value="unread">Belum Dibaca</option>
          <option value="read">Sudah Dibaca</option>
         </select>
         <button
          onClick={() => handleDelete(selectedMessage.id)}
          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700">
          Hapus Pesan
         </button>
        </div>
       </div>
      </div>
     </div>
    </div>
   )}
  </>
 );
}
