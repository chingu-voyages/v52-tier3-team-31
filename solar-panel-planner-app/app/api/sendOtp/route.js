import Otp from "@/app/models/Otp";
import Request from "@/app/models/Request";
import { sendEmail } from "@/utils/mail";
import connectToDatabase from "@/app/lib/db";
import { withSession } from "@/app/lib/session";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const session = await withSession();

    console.log("Session before:", session);

    await connectToDatabase();

    const existingRequest = await Request.findOne({ email });
    if (!existingRequest) {
      return new Response(
        JSON.stringify({ error: "No data found for this email" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 3600000;

    session.otp = { value: otp, expiry, existingRequest };
    await session.save();

    await Otp.create({ email, otp, expiry });

    const message = `Your OTP code is ${otp}. It will expire in 1 hour.`;

    try {
      await sendEmail({
        sender: "noreply@gmail.com",
        recipients: [{ address: email }],
        subject: "Your OTP Code",
        message,
      });

      return new Response(
        JSON.stringify({ message: "OTP sent successfully" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error sending email:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send OTP" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
