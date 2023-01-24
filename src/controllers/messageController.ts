import { Request, Response } from "express";
import Message from "../models/Message";

 
 export const newMessage = async(req:Request,res:Response)=>{
    const newMessage = new Message(req.body)
    try{
        const savedMessage = await newMessage.save()
        res.status(200).send(savedMessage)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
 }

 export const getMessage = async(req:Request,res:Response)=>{
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
 }