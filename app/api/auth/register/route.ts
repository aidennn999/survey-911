import {register} from "@/lib/utils/service";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
 try {
  const req = await request.json();

  // Validate request body
  if (!req.email || !req.password || !req.fullname || !req.phone) {
   return NextResponse.json(
    {
     status: false,
     message: "All fields are required: email, password, fullname, phone",
    },
    {status: 400}
   );
  }

  const res = await register(req);

  return NextResponse.json(
   {
    status: res.status,
    message: res.message,
    userId: res.userId,
   },
   {
    status: res.statusCode,
   }
  );
 } catch (error) {
  console.error("API route error:", error);
  return NextResponse.json(
   {
    status: false,
    message: "Internal server error",
   },
   {status: 500}
  );
 }
}
