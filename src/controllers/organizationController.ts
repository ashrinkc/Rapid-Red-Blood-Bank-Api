import { Request, Response } from "express";
import User from "../models/User";
import dotenv from 'dotenv'
import DonorRequest from "../models/Request";
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
export const organizationLogin = async(req:Request,res:Response) =>{
    try{
        const {email,password} = req.body
        const organization = await User.UserModel.findOne({email,password})
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
    const donorId = req.params.id
    try{
        // const organization = await User.UserModel.find({userType:'organization'})
        const organization = await User.UserModel.aggregate([
            {
                $match:{
                    userType:'organization'
                }
            }
        ])
        const donorRequests = await DonorRequest.find({donorId})
        //create array to store the organizations with status of the request
        const data:any = []
        //loop through the organizations
        organization.forEach((organization)=>{
            //find the corresponding request for the current organization
            const request = donorRequests.find((r)=>r.organizationId.toString() === organization._id.toString())
        
            //if there is a request add the status of the request
            if(request){
                data.push({
                    ...organization,
                    status: request.status
                })
            }else{
                //if the is no request add with default status of open
                data.push({
                    ...organization,
                    status: 'open'
                })
            }   
        })
        res.status(200).send(data)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getPatientOrganization = async(req:Request,res:Response)=>{
    try{
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

export const deleteOrganization = async(req:Request,res:Response)=>{
    try{
        const id = req.params.id
        const user = await User.UserModel.findById(id)
        if(!user){
            res.sendStatus(400);
            return;
        }
        if(user.userType !== "organization"){
            res.sendStatus(400);
            return;
        }
        await user.delete()
        res.status(200).send({success:true,message:"User successfully deleted"})
    }catch(err){
        console.log(err)
    }
}

export const updateStatus = async(req:Request,res:Response)=>{
    try{
        
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}