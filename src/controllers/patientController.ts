import { Request, response, Response } from "express";
import User from "../models/User";
import dotenv from "dotenv";
import cloudinary from "../helpers/cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = "sbvfhesdhjgfhjesdfhsdgfgajhf151212!@:}{ASDb";
export const patientLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid username" });
    }
    const validPassword = await bcrypt.compare(password, user!.password);
    if (!validPassword) {
      res.status(404).send({ success: false, message: "Invalid password" });
      return;
    }
    if (user.userType !== "patient") {
      res.sendStatus(400);
      return;
    }
    if (user.status === "disabled") {
      return res
        .status(401)
        .send({ success: false, message: "Your account has been disabled" });
    }
    // res.status(200).send({ success: true, JWT_SECRET, user });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });
    res.status(200).send({ success: true, token, user });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const patientRegister = async (req: Request, res: Response) => {
  try {
    const isPresent = await User.UserModel.findOne({
      email: req.body.email,
      userType: "patient",
    });
    if (isPresent) {
      return res.status(400).send({
        success: false,
        message: "Email already in use",
      });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    await User.UserModel.create({ ...req.body, userType: "patient" });
    res
      .status(200)
      .send({ success: true, message: "patient successfully registered" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const getAllPatient = async (req: Request, res: Response) => {
  try {
    let patient: any;
    if (req.query.userId) {
      patient = await User.UserModel.findOne({
        _id: req.query.userId,
        userType: "patient",
      }).select("-password");
    } else {
      patient = await User.UserModel.aggregate([
        {
          $match: {
            userType: "patient",
          },
        },
      ]);
    }
    res.status(200).send(patient);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const updatePatient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const pat: any = await User.UserModel.findById(id);
    if (req.body.profilePic) {
      const result = await cloudinary.uploader.upload(req.body.profilePic, {
        folder: "products",
      });
      pat.profilePic = result.secure_url;
      await pat.save();
      return res.status(200).send({
        success: true,
        message: "user picture successfully updated",
        pat,
      });
    }
    // Hash the password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;
    }
    const user = await User.PatientModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .send({ success: true, message: "user successfully updated", user });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const deletePatient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    // const user = await User.UserModel.aggregate([
    //     {
    //         $match:{
    //             _id:id,
    //             userType:"patient"
    //         }
    //     },
    //     {
    //         $project:{
    //             _id:1
    //         }
    //     },
    //     {
    //         $limit:1
    //     }
    // ])
    // if(user.length === 0){
    //     res.sendStatus(400);
    //     return;
    // }
    // await User.UserModel.deleteOne({_id:id})
    // res.status(200).send({success:true,message:"user successfully deleted"})
    const user = await User.UserModel.findById(id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    if (user.userType !== "patient") {
      res.sendStatus(400);
      return;
    }
    // await user.delete()
    user.status = "disabled";
    await user.save();
    res
      .status(200)
      .send({ success: true, message: "user successfully disabled" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const enablePatient = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    const id = req.params.id;
    const user = await User.UserModel.findById(id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    if (user.userType !== "patient") {
      res.sendStatus(400);
      return;
    }
    user.status = "active";
    await user.save();
    res
      .status(200)
      .send({ success: true, message: "user successfully enabled" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
