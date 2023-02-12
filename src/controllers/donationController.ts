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