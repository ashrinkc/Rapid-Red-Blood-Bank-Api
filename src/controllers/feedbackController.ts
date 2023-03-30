import { Request, Response } from "express";
import { contactMail } from "../helpers/mailer";
import Feedback from "../models/Feedback";
import nodemailer from "nodemailer";
export const userFeedback = async (req: Request, res: Response) => {
  try {
    await Feedback.create(req.body);
    res.status(200).send({ success: true, message: "Feedback has been sent" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const getAllFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.find()
      .populate("donorId", "name")
      .populate("patientId", "name")
      .populate("organizationId", "name")
      .sort({ createdAt: -1 });
    res.status(200).send(feedback);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const sendMail = async (req: Request, res: Response) => {
  try {
    // let testAccount = await nodemailer.createTestAccount();

    // let transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: testAccount.user, // generated ethereal user
    //     pass: testAccount.pass, // generated ethereal password
    //   },
    // });

    // let message = {
    //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //   to: "bar@example.com, baz@example.com", // list of receivers
    //   subject: "Hello ✔", // Subject line
    //   text: "Hello world?", // plain text body
    //   html: "<b>Hello world?</b>", // html body
    // };

    // transporter
    //   .sendMail(message)
    //   .then((info) => {
    //     return res
    //       .status(201)
    //       .json({
    //         msg: "You received an email",
    //         info: info.messageId,
    //         preview: nodemailer.getTestMessageUrl(info),
    //       });
    //   })
    //   .catch((err) => {
    //     return res.status(500).json({ err });
    //   });
    const data = {
      email: req.body.email,
      message: req.body.message,
      name: req.body.firstname + req.body.lastname,
      contact: req.body.contact,
    };
    const ress = await contactMail(data);
    console.log(ress);

    res.status(200).send("Sent");
  } catch (err) {
    console.log(err);
  }
};
