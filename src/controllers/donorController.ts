import { Request, Response } from "express";
import User from "../models/User";
import dotenv from 'dotenv'
import mongoose, { Types, ObjectId } from "mongoose";
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
export const donorLogin = async(req:Request,res:Response) =>{
    try{
        const {username,password} = req.body
        const user = await User.UserModel.findOne({username,password})
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

export const donorRegister = async(req:Request,res:Response)=>{
    try{
        await User.UserModel.create({...req.body,userType:"donor"})
        res.status(200).send({success:true,message:"Donor successfully registered"})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getAllDonor = async(req:Request,res:Response)=>{
    try{
        let donor: any;
        if(req.query.userId){
            donor = await User.UserModel.findOne({_id: req.query.userId, userType: 'donor'})
            .select('-password');
        }else{
            donor = await User.UserModel.aggregate([
            {
                $match:{
                    userType:'donor'
                }
            }
            ])
        }
        res.status(200).send(donor)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}