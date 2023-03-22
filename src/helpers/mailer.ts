import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE_PROVIDER,
    auth:{
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    }
})

export const volunteerMail = async(data:any)=>{
    try{
        await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: process.env.MAIL_USERNAME,
      subject: "About Volunteer application.",
      html: `<body style="background-color:#FFFFFF; color:#023243; font-size:15px; text-align: left"> 
      <h1 style =" text-align: center; color:#023243;"> VOLUNTEER REQUEST</h1>
      <p style="color:#023243; font-size:15px;"> ${data.name} who happens to be of age ${data.age} has
      requested to become 
       </b>  <br/><br/>
      
    <i>Sincerely</i>,<br/>
    <i>User</i><br/>
    </body>`,
    });
    return true
    }catch(err){
        return false
    }
}