import { Request, Response } from "express";
import mongoose from "mongoose";
import Donation from "../models/Donation";
import User from "../models/User";

export const donationRequest = async(req:Request,res:Response)=>{
    try{
        await Donation.create(req.body)
        res.status(200).send({success:true,message:"Donation request successfull"})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getAllDonationRequest = async(req:Request,res:Response)=>{
    try{
        const val = await Donation.find().populate('recipient',["email","name","contact"])
        res.status(200).send(val)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const donationPayment = async(req:Request,res:Response)=>{
    console.log(req.body)
    const {amount,donationId} = req.body
    try{
        const donation:any = await Donation.findById(donationId)
        if(donation){
            donation.donatedAmount += amount
            donation.donors.push({userId:req.body.userId,amount,timestamp:Date.now()})
            await donation.save()
        }
        return res.status(200).json("Payment Successfull")
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getRecepient = async(req:Request,res:Response)=>{
    try{
        const donation = await Donation.find({recipient:req.params.id})
        res.status(201).send(donation)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getDonationById = async(req:Request,res:Response)=>{
    try{
        const donation = await Donation.findById(req.params.id)
        res.status(201).send(donation)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getDonorStats = async(req:Request,res:Response) =>{
    try{
        const donationId = req.params.id 
        // const mostRecentDonor = await Donation.findById(donationId,{donors:{$slice:-1}})
        const donation:any = await Donation.findById(donationId)
        const mostRecentDonor = await Donation.aggregate([
            {
                $match:{_id: donation._id}
            },
            {
                $project:{
                    _id:0,
                    donors:{$slice:['$donors',-1]}
                }
            }
        ])
        
        const topDonor = await Donation.aggregate([
            {$match:{_id:donation._id}},
            {
                $unwind:"$donors",
            },
            {
                $group:{
                    _id:"$donors.userId",
                    totalAmount:{$sum:"$donors.amount"},
                },
            },
            {
                $sort:{
                    totalAmount:-1,
                },
            },
            {
                $limit:1,
            },
            {
                $lookup:{
                    from:"User.DonorModel",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $project:{
                    _id:1,
                    totalDonation:"$totalAmount",
                    user:{$arrayElemAt:["$user",0]}
                }
            },
        ]).exec()
        const topDonorId = topDonor[0]._id
        const latestDonorId = mostRecentDonor[0].donors[0].userId;
        const topDonorInfo:any = await User.DonorModel.findById(topDonorId)
        const latestDonorInfo:any = await User.DonorModel.findById(latestDonorId)
        res.status(201).send({latest:latestDonorInfo.name,top:topDonorInfo.name})
        // console.log(topDonorInfo.name)
        // console.log(latestDonorInfo.name)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}