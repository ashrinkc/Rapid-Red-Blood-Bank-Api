import { Response, Request } from "express";
import DonorRequest from "../models/Request";
import User from "../models/User";

export const bloodRequests = async(req:Request,res:Response) =>{
    try{
        //find the donor by their id
        // const donor:any = await User.DonorModel.findById(req.params.id)
        // const organization:any = await User.OrganizationModel.findById(req.body.organizationId)
        const donorId = req.params.id
        const organizationId = req.body
        const request = new DonorRequest({donorId,organizationId,...req.body})
        await request.save()
        res.status(201).send({ success:true, message: 'Request sent successfully' });
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getDonationRequests = async(req:Request,res:Response)=>{
    try{
        const organizationId = req.params.id
        const requests = await DonorRequest.find({organizationId}).populate("donorId",["email","name","bloodType","contact"])
        res.status(200).send(requests)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}