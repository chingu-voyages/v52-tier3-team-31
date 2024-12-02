import { sendEmail } from "@/utils/mail"

export async function POST(req) {
  try {
    const body = await req.json(); 
    const { sender, recipients, subject, message } = body;

    const result = await sendEmail({
      sender,
      recipients,
      subject,
      message,
    });

    return new Response(
      JSON.stringify({
        accepted: result.accepted,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send email",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}