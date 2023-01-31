import { Request, Response } from "express";
import Event, { IEvent } from "../models/Events";

export const addEvents = async(req:Request,res:Response)=>{
    try{
        await Event.create(req.body)
        res.status(200).send("Event successfully created")
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getAllEvents = async(req:Request,res:Response)=>{
    try{
        const event:any = await Event.find()
        const eventsWithDateTime = event.map((event:any)=>{
            const date = event.eventTime.toISOString().split('T')[0]
            const time = event.eventTime.toISOString().split('T')[1].slice(0,-1)
            return{
                ...event,
                date,
                time
            }
        })
        
        res.status(200).send(event)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}