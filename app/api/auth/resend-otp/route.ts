// app/api/auth/resend-otp/route.ts
import {
 collection,
 query,
 where,
 getDocs,
 updateDoc,
 doc,
} from "firebase/firestore";
import {firestore} from "@/lib/firebase/init";
import {NextResponse} from "next/server";
import {sendVerificationEmail} from "@/lib/actions/email"; // Import langsung dari email.ts

export async function POST(request: Request) {
 try {
  const {email} = await request.json();

  if (!email) {
   return NextResponse.json(
    {status: false, message: "Email is required"},
    {status: 400}
   );
  }

  // Find user by email
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
   return NextResponse.json(
    {status: false, message: "User not found"},
    {status: 404}
   );
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();

  // Generate new OTP
  const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

  // Update user with new OTP
  await updateDoc(doc(firestore, "users", userDoc.id), {
   otp: newOtp,
   otpExpiry: new Date(Date.now() + 15 * 60 * 1000),
   updatedAt: new Date(),
  });

  console.log("New OTP generated for:", email);

  // Send new verification email
  try {
   await sendVerificationEmail(email, newOtp, userData.fullname);
   console.log("Verification email sent successfully");

   return NextResponse.json({
    status: true,
    message: "New verification code sent to your email",
   });
  } catch (emailError) {
   console.error("Failed to send email:", emailError);

   // Still return success but inform about email issue
   return NextResponse.json({
    status: true,
    message:
     "New code generated but failed to send email. Please try logging in or contact support.",
   });
  }
 } catch (error) {
  console.error("Resend OTP error:", error);
  return NextResponse.json(
   {
    status: false,
    message: `Failed to resend verification code: ${
     error instanceof Error ? error.message : "Unknown error"
    }`,
   },
   {status: 500}
  );
 }
}
