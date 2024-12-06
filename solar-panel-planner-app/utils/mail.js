import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "newe8258@gmail.com",
    pass: "pmer rxoo qgcp jaim",
  },
});

export const sendEmail = async ({ sender, recipients, subject, message }) => {
  const mailOptions = {
    from: sender,
    to: recipients.map((r) => r.address).join(", "),
    subject,
    text: message,
    html: message,
  };

  return await transporter.sendMail(mailOptions);
};
