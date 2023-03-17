import { Request, Response } from "express";
import Donation from "../models/Donation";

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
        const topDonor = await Donation.aggregate([
            {$match:{$_id:donationId}},
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
        ])
        
        console.log(topDonor)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}