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