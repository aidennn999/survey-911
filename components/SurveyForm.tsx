"use client";

import {useState} from "react";
import {addAnonymousMessage} from "@/lib/utils/contactService";

export default function SurveyForm() {
 const [formData, setFormData] = useState({
  subject: "",
  message: "",
 });
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
  null
 );

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
   const result = await addAnonymousMessage(formData);

   if (result.success) {
    setSubmitStatus("success");
    setFormData({subject: "", message: ""});
   } else {
    setSubmitStatus("error");
   }
  } catch (error) {
   setSubmitStatus("error");
  } finally {
   setIsSubmitting(false);
  }
 };

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
 ) => {
  const {name, value} = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]: value,
  }));
 };

 return (
  <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
   <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Survey Pelanggan</h1>
    <p className="text-gray-600">
     Sampaikan kritik dan saran Anda secara anonym. Identitas Anda tidak akan
     disimpan.
    </p>
   </div>

   {submitStatus === "success" && (
    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
     <div className="flex items-center">
      <svg
       className="w-5 h-5 text-green-500 mr-2"
       fill="currentColor"
       viewBox="0 0 20 20">
       <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
       />
      </svg>
      <span className="text-green-800 font-medium">
       Terima kasih! Pesan Anda telah berhasil dikirim.
      </span>
     </div>
    </div>
   )}

   {submitStatus === "error" && (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
     <div className="flex items-center">
      <svg
       className="w-5 h-5 text-red-500 mr-2"
       fill="currentColor"
       viewBox="0 0 20 20">
       <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
       />
      </svg>
      <span className="text-red-800 font-medium">
       Maaf, terjadi kesalahan. Silakan coba lagi.
      </span>
     </div>
    </div>
   )}

   <form
    onSubmit={handleSubmit}
    className="space-y-6">
    <div>
     <label
      htmlFor="subject"
      className="block text-sm font-medium text-gray-700 mb-2">
      Subjek
     </label>
     <input
      type="text"
      id="subject"
      name="subject"
      value={formData.subject}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Masukkan subjek pesan Anda"
      maxLength={100}
     />
    </div>

    <div>
     <label
      htmlFor="message"
      className="block text-sm font-medium text-gray-700 mb-2">
      Kritik & Saran
     </label>
     <textarea
      id="message"
      name="message"
      value={formData.message}
      onChange={handleChange}
      required
      rows={6}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
      placeholder="Tuliskan kritik dan saran Anda di sini..."
      maxLength={1000}
     />
     <div className="text-right text-sm text-gray-500 mt-1">
      {formData.message.length}/1000 karakter
     </div>
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
     <div className="flex items-start">
      <svg
       className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
       fill="currentColor"
       viewBox="0 0 20 20">
       <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
       />
      </svg>
      <div>
       <p className="text-sm text-blue-800">
        <strong>Informasi:</strong> Survey ini sepenuhnya anonym. Kami tidak
        menyimpan informasi pribadi seperti nama, email, atau alamat IP Anda.
       </p>
      </div>
     </div>
    </div>

    <div>
     <button
      type="submit"
      disabled={isSubmitting}
      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
      {isSubmitting ? (
       <>
        <svg
         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24">
         <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"></circle>
         <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Mengirim...
       </>
      ) : (
       "Kirim Kritik & Saran"
      )}
     </button>
    </div>
   </form>
  </div>
 );
}
