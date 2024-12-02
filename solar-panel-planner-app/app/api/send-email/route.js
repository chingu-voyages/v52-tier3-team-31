// import nodemailer from "nodemailer";

import { sendEmail } from "@/utils/mail"

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { to, subject, text, html } = req.body;

//     try {
//       const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         auth: {
//           user: "newe8258@gmail.com",
//           pass: "pmer rxoo qgcp jaim",
//         },
//       });

//       await transporter.sendMail({
//         from: "BrightGrid",
//         to,
//         subject,
//         text,
//         html,
//       });

//       res.status(200).json({ message: "Email sent successfully" });
//     } catch (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ error: "Failed to send email" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
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