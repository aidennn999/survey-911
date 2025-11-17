import SurveyForm from "@/components/SurveyForm";

export default function Home() {
 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-7xl mx-auto">
    <SurveyForm />

    {/* Informasi tambahan */}
    <div className="mt-12 max-w-3xl mx-auto text-center">
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg p-6 shadow-sm">
       <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
         className="w-6 h-6 text-blue-600"
         fill="none"
         stroke="currentColor"
         viewBox="0 0 24 24">
         <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
         />
        </svg>
       </div>
       <h3 className="text-lg font-semibold text-gray-900 mb-2">Anonym</h3>
       <p className="text-gray-600 text-sm">
        Identitas Anda sepenuhnya terlindungi. Tidak ada data pribadi yang
        disimpan.
       </p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
       <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
         className="w-6 h-6 text-green-600"
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
       </div>
       <h3 className="text-lg font-semibold text-gray-900 mb-2">Aman</h3>
       <p className="text-gray-600 text-sm">
        Data Anda disimpan dengan aman dan hanya dapat diakses oleh admin
        terpercaya.
       </p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
       <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
         className="w-6 h-6 text-purple-600"
         fill="none"
         stroke="currentColor"
         viewBox="0 0 24 24">
         <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
         />
        </svg>
       </div>
       <h3 className="text-lg font-semibold text-gray-900 mb-2">Bermanfaat</h3>
       <p className="text-gray-600 text-sm">
        Setiap masukan Anda membantu kami meningkatkan kualitas layanan.
       </p>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
