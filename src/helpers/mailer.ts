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
      <p style="color:#023243; font-size:15px;"> ${data.message}</p>
      <p style="color:#023243; font-size:15px;">Contact: ${data.contact}</p>

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

export const bloodRequestMail = async (data: any) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: data.receiver,
      subject: "Blood Request",
      html: `<body style="background-color:#FFFFFF; color:#023243; font-size:15px; text-align: left"> 
      <h1 style =" text-align: center; color:#023243;">Blood Request From ${data.name}</h1>
      <p style="color:#023243; font-size:15px;"> Requested Blood Type: ${data.bloodType}</p>
      <p style="color:#023243; font-size:15px;"> Age: ${data.age}</p>
      <p style="color:#023243; font-size:15px;"> Gender: ${data.gender}</p>
      <p style="color:#023243; font-size:15px;"> About: ${data.about}</p>
       </b>  <br/><br/>
    </body>`,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const bloodRequestStatus = async (data: any) => {
  try {
    await transporter.sendMail({
      from: data.sender,
      to: data.receiver,
      subject: "Blood Request",
      html: `<body style="background-color:#FFFFFF; color:#023243; font-size:15px; text-align: left"> 
      <h1 style =" text-align: center; color:#023243;">Blood Request Status</h1>
      <p style="color:#023243; font-size:15px;"> Your request has been ${data.status} that you sent to ${data.name}</p>
       </b>  <br/><br/>
      
    </body>`,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
