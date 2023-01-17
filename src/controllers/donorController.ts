import { Request, Response } from "express";
import User from "../models/User";
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
export const donorLogin = async(req:Request,res:Response) =>{
    console.log(JWT_SECRET)
    try{
        const {username,password} = req.body
        const user = await User.UserModel.findOne({username,password})
        if(!user){
            res.status(404).send({success:false,message:"Invalid username or password"})
            return
        }
        res.status(200).send({success:true,JWT_SECRET})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const donorRegister = async(req:Request,res:Response)=>{
    try{
        const donor = await User.UserModel.create({...req.body,userType:"donor"})
        res.status(200).send({success:true,message:"Donor successfully registered",donor})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}