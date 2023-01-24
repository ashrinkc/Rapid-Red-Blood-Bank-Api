import { Request, Response } from "express";
import Conversation from "../models/Conversation";

export const newConversation = async(req:Request,res:Response)=>{
    const newConversation = new Conversation({
        member:[req.body.senderId,req.body.receiverId]
    })
    try{
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getConversation = async(req:Request,res:Response)=>{
    try{
        const conversation = await Conversation.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(conversation)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}