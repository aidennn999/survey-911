"use client";

import {useState, useEffect} from "react";
import {
 FiTrash2,
 FiMail,
 FiUser,
 FiClock,
 FiEye,
 FiEyeOff,
} from "react-icons/fi";
import {Message} from "@/types/message";

interface MessageListProps {
 messages: Message[];
 onDelete: (id: string) => void;
 onToggleRead: (id: string, read: boolean) => void;
}

export default function MessageList({
 messages,
 onDelete,
 onToggleRead,
}: MessageListProps) {
 const [localMessages, setLocalMessages] = useState<Message[]>(messages);

 useEffect(() => {
  setLocalMessages(messages);
 }, [messages]);

 const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("id-ID", {
   dateStyle: "medium",
   timeStyle: "short",
  }).format(date);
 };

 const handleToggleRead = async (id: string, currentRead: boolean) => {
  try {
   await onToggleRead(id, !currentRead);
   setLocalMessages((prev) =>
    prev.map((msg) => (msg.id === id ? {...msg, read: !currentRead} : msg))
   );
  } catch (error) {
   console.error("Error toggling read status:", error);
  }
 };

 if (localMessages.length === 0) {
  return (
   <div className="text-center py-12">
    <FiMail className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 text-sm font-medium text-gray-900">No messages</h3>
    <p className="mt-1 text-sm text-gray-500">No customer messages yet.</p>
   </div>
  );
 }

 return (
  <div className="space-y-4">
   {localMessages.map((message) => (
    <div
     key={message.id}
     className={`bg-white rounded-lg shadow border-l-4 ${
      message.read ? "border-l-gray-300" : "border-l-blue-500"
     }`}>
     <div className="p-6">
      <div className="flex items-start justify-between">
       <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
         <FiUser className="w-4 h-4 text-gray-400" />
         <h3 className="text-lg font-medium text-gray-900">{message.name}</h3>
         {!message.read && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
           New
          </span>
         )}
        </div>

        <div className="flex items-center space-x-3 mb-3 text-sm text-gray-500">
         <div className="flex items-center space-x-1">
          <FiMail className="w-4 h-4" />
          <span>{message.email}</span>
         </div>
         <div className="flex items-center space-x-1">
          <FiClock className="w-4 h-4" />
          <span>{formatDate(message.createdAt)}</span>
         </div>
        </div>

        <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
       </div>

       <div className="flex items-center space-x-2 ml-4">
        <button
         onClick={() => handleToggleRead(message.id, message.read)}
         className={`p-2 rounded-lg transition-colors ${
          message.read
           ? "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
           : "text-blue-400 hover:text-blue-600 hover:bg-blue-50"
         }`}
         title={message.read ? "Mark as unread" : "Mark as read"}>
         {message.read ? (
          <FiEyeOff className="w-5 h-5" />
         ) : (
          <FiEye className="w-5 h-5" />
         )}
        </button>

        <button
         onClick={() => onDelete(message.id)}
         className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
         title="Delete message">
         <FiTrash2 className="w-5 h-5" />
        </button>
       </div>
      </div>
     </div>
    </div>
   ))}
  </div>
 );
}
