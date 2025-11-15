import nodemailer from "nodemailer";

// Debug environment variables
console.log("Email Config Check:", {
 EMAIL_USER: process.env.EMAIL_USER ? "Set" : "Not set",
 EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? "Set" : "Not set",
 NEXTAUTH_URL: process.env.NEXTAUTH_URL,
});

export const sendVerificationEmail = async (
 email: string,
 code: string,
 fullname?: string
): Promise<boolean> => {
 try {
  console.log("Attempting to send verification email to:", email);

  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
   console.error("Missing email environment variables");
   throw new Error("Email configuration is incomplete");
  }

  const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
   },
   // Add timeout and better error handling
   connectionTimeout: 10000, // 10 seconds
   socketTimeout: 10000, // 10 seconds
  });

  // Verify transporter configuration
  await transporter.verify();
  console.log("Email transporter verified successfully");

  const mailOptions = {
   from: `"Admin Panel" <${process.env.EMAIL_USER}>`,
   to: email,
   subject: "Email Verification - Admin Panel",
   html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Email Verification</h1>
          <p style="font-size: 16px;">Hi ${fullname || "User"},</p>
          <p style="font-size: 16px;">Thank you for registering. Please use the following verification code:</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h2 style="margin: 0; font-size: 32px; letter-spacing: 8px; color: #2563eb; font-weight: bold;">${code}</h2>
          </div>
          <p style="font-size: 14px; color: #6b7280;">
            Enter this code on the verification page to complete your registration.
          </p>
          <p style="font-size: 14px; color: #6b7280;">
            This code will expire in 15 minutes.
          </p>
          <p style="font-size: 14px; color: #6b7280;">
            If you did not request this verification, please ignore this email.
          </p>
          <p style="font-size: 14px; color: #6b7280;">
            Best regards,<br>
            Admin Panel Team
          </p>
        </div>
      `,
  };

  const result = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully:", result.messageId);
  return true;
 } catch (error) {
  console.error("Error sending verification email:", error);

  // More detailed error logging
  if (error instanceof Error) {
   console.error("Error name:", error.name);
   console.error("Error message:", error.message);
   console.error("Error stack:", error.stack);
  }

  throw new Error(
   `Failed to send verification email: ${
    error instanceof Error ? error.message : "Unknown error"
   }`
  );
 }
};
