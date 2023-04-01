import { Request, Response } from "express";
import Admin from "../models/Admin";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cloudinary from "../helpers/cloudinary";
import bcrypt from "bcrypt";
dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET
const JWT_SECRET = "sbvfhesdhjgfhjesdfhsdgfgajhf151212!@:}{ASDb";

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });
    if (!user) {
      res.status(404).send({ success: false, message: "Invalid username" });
      return;
    }
    const validPassword = await bcrypt.compare(password, user!.password);
    if (!validPassword) {
      res.status(404).send({ success: false, message: "Invalid password" });
      return;
    }
    const token = jwt.sign({ id: user._id, email: user.username }, JWT_SECRET, {
      expiresIn: "15m",
    });
    res.status(200).send({ success: true, token, user });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const adminRegister = async (req: Request, res: Response) => {
  await Admin.create(req.body);
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const don: any = await Admin.findById(id);
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
    const user = await Admin.findByIdAndUpdate(id, req.body);
    res
      .status(200)
      .send({ success: true, message: "user successfully updated", user });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
