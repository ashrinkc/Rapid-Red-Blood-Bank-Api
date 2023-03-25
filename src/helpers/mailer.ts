import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE_PROVIDER,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const contactMail = async (data: any) => {
  try {
    await transporter.sendMail({
      from: data.email,
      to: process.env.MAIL_USERNAME,
      subject: "Contact Us Response",
      html: `<body style="background-color:#FFFFFF; color:#023243; font-size:15px; text-align: left"> 
      <h1 style =" text-align: center; color:#023243;"> ${data.name}</h1>
      <p style="color:#023243; font-size:15px;"> ${data.message}
       </b>  <br/><br/>
      
    <i>From,</i>,<br/>
    <i>${data.email}</i><br/>
    </body>`,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
