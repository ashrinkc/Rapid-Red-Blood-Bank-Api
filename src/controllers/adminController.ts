import { Request, Response } from "express";
import Admin from "../models/Admin";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET
const JWT_SECRET = "sbvfhesdhjgfhjesdfhsdgfgajhf151212!@:}{ASDb";

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username, password });
    if (!user) {
      res
        .status(404)
        .send({ success: false, message: "Invalid username or password" });
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
