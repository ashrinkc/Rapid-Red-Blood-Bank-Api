import { Request, Response } from "express";
import Event, { IEvent } from "../models/Events";
import Volunteer from "../models/Volunteer";

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
        const events = await Event.find()
        // const eventsWithDateTime = event.map((event:any)=>{
        //     const date = event.eventTime.toISOString().split('T')[0]
        //     const time = event.eventTime.toISOString().split('T')[1].slice(0,-1)
        //     return{
        //         ...event,
        //         date,
        //         time
        //     }
        // })
        const volunteerId = req.query.id
        const volunteerRequest = await Volunteer.find({volunteerId})
        const data:any = []
        events.forEach((event:any)=>{
            const request = volunteerRequest.find((r)=>r.eventId.toString()===event._id.toString())
            if(request){
                data.push({
                    ...event._doc,
                    status:request.status
                })
            }else{
                data.push({
                    ...event._doc,
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

export const eventVolunteer = async(req:Request,res:Response)=>{
    try{
        const volunteerId = req.params.id;
        const organizationId = req.body.organizationId
        const volunteer = new Volunteer({volunteerId,organizationId,...req.body})
        await volunteer.save()
        res.status(201).send({ success:true, message: 'Request sent successfully' });
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getEventVolunteer = async(req:Request,res:Response)=>{
    try{
        const organizationId = req.params.id
        const volunteers = await Volunteer.find({organizationId})
        console.log(volunteers)
        res.status(201).send(volunteers)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}
export const getEventsById = async(req:Request,res:Response)=>{
    try{
        const orgId = req.params.id
        const event = await Event.find({organizationId:orgId})
        res.status(201).send(event)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}