import SurveyForm from "@/components/SurveyForm";

export default function Home() {
 return (
  <div className="max-h-100dvh bg-[#ffebd2] py-8 px-4 sm:px-6 lg:px-8 flex flex-col">
   <div className="flex-1 flex flex-col justify-center">
    <div className="max-w-7xl mx-auto w-full">
     <SurveyForm />
    </div>
   </div>
  </div>
 );
}
