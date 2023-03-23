import { Request, Response } from "express";
import Feedback from "../models/Feedback";

export const userFeedback = async(req:Request,res:Response) =>{
    try{
        await Feedback.create(req.body)
        res.status(200).send({success:true,message:"Feedback has been sent"})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getAllFeedback = async(req:Request,res:Response)=>{
    try{
        const feedback = await Feedback.find()
        .populate('donorId','name')
        .populate('patientId','name')
        .populate('organizationId','name')
        .sort({createdAt:-1})
        res.status(200).send(feedback)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}