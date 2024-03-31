import nodemailer from "nodemailer";

const SendEmail = async (recpients, subject, mailHtml)=>{
  console.log("recpients", mailHtml);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.NVM_EMAIL,
      pass: process.env.NVM_APP_PASSKEY,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.NVM_EMAIL, 
    to: recpients, 
    subject: subject,
    text: "",
    html: `${mailHtml}`,
  });
  return info;
}
export default SendEmail;