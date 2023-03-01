import { Response, Request } from "express";
import mongoose from "mongoose";
import PatientRequest from "../models/PatientRequest";
import DonorRequest from "../models/Request";
import User from "../models/User";

export const bloodDonationRequests = async(req:Request,res:Response) =>{
    try{
        //find the donor by their id
        // const donor:any = await User.DonorModel.findById(req.params.id)
        // const organization:any = await User.OrganizationModel.findById(req.body.organizationId.id)
        const donorId = req.params.id
        const organizationId = req.query.organizationId;
        const request = new DonorRequest({ donorId, organizationId, ...req.body });
        await request.save();
        res.status(201).send({ success: true, message: 'Request sent successfully' });
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

export const updateDonationRequestStatus = async(req:Request,res:Response)=>{
    try{
        const id = req.params.id 
        const donor = await DonorRequest.findById(id)
        if(donor){
            if(req.body.status === "approved"){
                donor.status = "approved"
                donor.orgStatus = "approved"
                await donor.save()
                return res.status(500).send("Donor request approved")
            }
            else if(req.body.status === "rejected"){
                donor.status = "rejected"
                donor.orgStatus = "rejected"
                await donor.save()
                return res.status(500).send("Donor request rejected")
            }
        }
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const patientBloodRequest = async(req:Request,res:Response) =>{
    try{
        const patientId = req.params.id
        const request = new PatientRequest({patientId,...req.body});
        await request.save()
        res.status(201).send({success:true,message:"Request sent successfully"})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getPatientBloodRequestsDonor = async(req:Request,res:Response) =>{
    try{
        const donorId = req.params.id   
        const requests = await PatientRequest.find({donorId}).populate("patientId",["email","name","contact"])
        res.status(200).send(requests)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getPatientsBloodRequestsBloodBank = async(req:Request,res:Response)=>{
    try{
        const organizationId = req.params.id
        const requests = await PatientRequest.find({organizationId}).populate("patientId",["email","name","contact"])
        res.status(200).send(requests)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const updatePatientRequestStatus = async(req:Request,res:Response) =>{
    try{
        const id = req.params.id 
        const request = await PatientRequest.findById(id)
        if(request){
            if(req.body.status === "approved"){
                request.status = "approved"
                request.orgStatus = "approved"
                await request.save()
                return res.status(500).send("patient request approved")
            }
            else if(req.body.status === "rejected"){
                request.status = "rejected"
                request.orgStatus = "rejected"
                await request.save()
                return res.status(500).send("patient request rejected")
            }
        }
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}