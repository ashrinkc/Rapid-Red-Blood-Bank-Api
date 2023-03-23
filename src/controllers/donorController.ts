import { Request, Response } from "express";
import User from "../models/User";
import dotenv from 'dotenv'
import mongoose, { Types, ObjectId } from "mongoose";
import PatientRequest from "../models/PatientRequest";
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
export const donorLogin = async(req:Request,res:Response) =>{
    try{
        const {email,password} = req.body
        const user = await User.UserModel.findOne({email,password})
        if(!user){
            res.status(404).send({success:false,message:"Invalid username or password"})
            return
        }
          if(user.userType !== "donor"){
                res.sendStatus(400);
                return;
            }
        if(user.status === 'disabled'){
            return res.status(401).send({success:false,message:"Your account has been disabled"})
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

export const patientDonor = async(req:Request,res:Response)=>{
    try{
        const patientId = req.params.id
        const donors = await User.UserModel.aggregate([
            {
                $match:{
                    userType:'donor'
                }
            }
        ])
        const patientRequest = await PatientRequest.find({patientId})
        const data:any = []
        donors.forEach((donor)=>{
            const request = patientRequest.find((r)=>{
                if(r.donorId && donor._id){
               return r.donorId.toString() === donor._id.toString()
            }})
            if(request){
                data.push({
                    ...donor,
                    status:request.status
                })
            }else{
                data.push({
                    ...donor,
                    status:'open'
                })
            }
        })
        res.status(200).send(data)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const updateDonor = async(req:Request,res:Response)=>{
    try{
        const id = req.params.id
        const user = await User.DonorModel.findByIdAndUpdate(id,req.body)
        res.status(200).send({success:true,message:"user successfully updated",user})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const deleteDonor = async(req:Request,res:Response)=>{
    try{
        const id = req.params.id
        const user = await User.UserModel.findById(id)
        if(!user){
            res.sendStatus(400);
            return;
        }
        if(user.userType !== "donor"){
            res.sendStatus(400);
            return;
        }
        // await user.delete()
        user.status = 'disabled'
        await user.save()
        res.status(200).send({success:true,message:"user successfully disabled"})
    }catch(err){
        console.log(err)
    }
}

export const enableDonor = async(req:Request,res:Response) =>{
    try{
            const id = req.params.id
            const user = await User.UserModel.findById(id)
            if(!user){
                res.sendStatus(400);
                return;
            }
            if(user.userType !== "donor"){
                res.sendStatus(400);
                return;
            }
        user.status = 'active'
        await user.save()
        res.status(200).send({success:true,message:"user successfully activated"})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}