import { Request, Response } from "express";
import User from "../models/User";
import dotenv from "dotenv";
import mongoose, { Types, ObjectId } from "mongoose";
import PatientRequest from "../models/PatientRequest";
import cloudinary from "../helpers/cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

const JWT_SECRET = "sbvfhesdhjgfhjesdfhsdgfgajhf151212!@:}{ASDb";
export const donorLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.UserModel.findOne({ email });
    if (!user) {
      res.status(404).send({ success: false, message: "Invalid username" });
      return;
    }
    const validPassword = await bcrypt.compare(password, user!.password);

    if (!validPassword) {
      res.status(404).send({ success: false, message: "Invalid password" });
      return;
    }

    if (user.userType !== "donor") {
      res.sendStatus(400);
      return;
    }

    if (user.status === "disabled") {
      return res
        .status(401)
        .send({ success: false, message: "Your account has been disabled" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });
    // res.status(200).send({ success: true, token });
    res.status(200).send({ success: true, token, user });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const donorRegister = async (req: Request, res: Response) => {
  try {
    const isPresent = await User.UserModel.findOne({
      email: req.body.email,
      userType: "donor",
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
    const user = new User.UserModel({ ...req.body, userType: "donor" });
    await user.save();

    res
      .status(200)
      .send({ success: true, message: "Donor successfully registered" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const getAllDonor = async (req: Request, res: Response) => {
  try {
    let donor: any;
    if (req.query.userId) {
      donor = await User.UserModel.findOne({
        _id: req.query.userId,
        userType: "donor",
      }).select("-password");
    } else {
      donor = await User.UserModel.aggregate([
        {
          $match: {
            userType: "donor",
          },
        },
      ]);
    }
    res.status(200).send(donor);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const patientDonor = async (req: Request, res: Response) => {
  try {
    const patientId = req.params.id;
    const donors = await User.UserModel.aggregate([
      {
        $match: {
          userType: "donor",
        },
      },
    ]);
    const patientRequest = await PatientRequest.find({ patientId });
    const requestMap: any = {};

    patientRequest.forEach((request) => {
      requestMap[request?.donorId?.toString()] = request;
    });

    const data: any = [];

    donors.forEach((donor) => {
      // const request = patientRequest.find((r) => {
      //   if (r.donorId && donor._id) {
      //     return r.donorId.toString() === donor._id.toString();
      //   }
      // });
      const request = requestMap[donor._id.toString()];
      if (request) {
        data.push({
          ...donor,
          status: request.status,
        });
      } else {
        data.push({
          ...donor,
          status: "open",
        });
      }
    });
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const updateDonor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const don: any = await User.UserModel.findById(id);
    if (req.body.profilePic) {
      const result = await cloudinary.uploader.upload(req.body.profilePic, {
        folder: "products",
      });
      don.profilePic = result.secure_url;
      await don.save();
      return res.status(200).send({
        success: true,
        message: "user picture successfully updated",
        don,
      });
    }
    // Hash the password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;
    }
    const user = await User.DonorModel.findByIdAndUpdate(id, req.body, {
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

export const deleteDonor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.UserModel.findById(id);
    if (!user) {
      res.sendStatus(400);
      return;
    }
    if (user.userType !== "donor") {
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
  }
};

export const enableDonor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.UserModel.findById(id);
    if (!user) {
      res.sendStatus(400);
      return;
    }
    if (user.userType !== "donor") {
      res.sendStatus(400);
      return;
    }
    user.status = "active";
    await user.save();
    res
      .status(200)
      .send({ success: true, message: "user successfully activated" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
