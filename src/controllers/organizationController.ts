import { Request, Response } from "express";
import User from "../models/User";
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
export const organizationLogin = async(req:Request,res:Response) =>{
    try{
        const {username,password} = req.body
        const organization = await User.UserModel.findOne({username,password})
        if(!organization){
            res.status(404).send({success:false,message:"Invalid username or password"})
            return
        }
        res.status(200).send({success:true,JWT_SECRET,organization})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const organizationRegister = async(req:Request,res:Response)=>{
    try{
        const organization = await User.UserModel.create({...req.body,userType:"organization"})
        res.status(200).send({success:true,message:"Successfully registered",organization})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getAllOrganization = async(req:Request,res:Response)=>{
    try{
        // const organization = await User.UserModel.find({userType:'organization'})
        const organization = await User.UserModel.aggregate([
            {
                $match:{
                    userType:'organization'
                }
            }
        ])
        res.status(200).send(organization)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const updateStatus = async(req:Request,res:Response)=>{
    try{
        
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}