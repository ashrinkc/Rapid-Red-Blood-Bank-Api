import { Request, Response } from "express";
import Admin from "../models/Admin";
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
export const adminLogin = async(req:Request,res:Response) =>{
    try{
        const {username,password} = req.body
        const user = await Admin.findOne({username,password})
        if(!user){
            res.status(404).send({success:false,message:"Invalid username or password"})
            return
        }
        res.status(200).send({success:true,JWT_SECRET,user})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const adminRegister = async(req:Request,res:Response) =>{
    await Admin.create(req.body)
}