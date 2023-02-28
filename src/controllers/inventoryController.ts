import { Request, Response } from "express";
import bloodBankData from "../models/BloodBankData";
import Inventory, { Iinventory } from "../models/Inventory";
import User from "../models/User";

export const createInventory = async(req:Request,res:Response)=>{
    try{
        const bloodBank = await User.OrganizationModel.findById(req.params.id)
        if(!bloodBank){
            return res.status(404).send({success:false,message:"Blood bank not found"})
        }
        const inventory = new Inventory({bloodBank:bloodBank._id})
        await inventory.save()
        res.status(201).send(inventory)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getInventory = async(req:Request,res:Response)=>{
    try{
        const bloodBank = req.params.id 
        const inventory = await Inventory.find({bloodBank})
        res.status(201).send(inventory)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const addToInventory = async(req:Request,res:Response) =>{
    try{
        const id = req.params.id 
        const inventory = await Inventory.findById(id)
        if(inventory){
            if(req.body.type === 'A+'){
                inventory.Aplus += req.body.quantity
            }
            else if(req.body.type === 'A-'){
                inventory.Aminus += req.body.quantity
            }
            else if(req.body.type === 'B-'){
                inventory.Bminus += req.body.quantity
            }
            else if(req.body.type === 'B+'){
                inventory.Bplus += req.body.quantity
            }
            else if(req.body.type === 'AB-'){
                inventory.ABminus += req.body.quantity
            }
            else if(req.body.type === 'AB+'){
                inventory.ABplus += req.body.quantity
            }
            else if(req.body.type === 'O-'){
                inventory.Ominus += req.body.quantity
            }
            else if(req.body.type === 'O+'){
                inventory.Oplus += req.body.quantity
            }
            await inventory.save()
        }
        const bloodbankdata = await bloodBankData.create({
            bloodBank:req.body.bloodBank,
            name:req.body.name,
            type:'donor',
            quantity: req.body.quantity,
            bloodType:req.body.bloodType,
            contact:req.body.contact
        })
        res.status(201).send({success:"true",message:"Successfull"})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const removeFromInventory = async(req:Request,res:Response) =>{
    try{
        const id = req.params.id 
        const inventory = await Inventory.findById(id)
        if(inventory){
            if(req.body.type === 'A+'){
                if(req.body.quantity > inventory.Aplus){
                    return res.status(401).send({success:false,message:"Requested quantity higher than total quantity"})
                }
                inventory.Aplus -= req.body.quantity
            }
            else if(req.body.type === 'A-'){
                if(req.body.quantity > inventory.Aminus){
                    return res.status(401).send({success:false,message:"Requested quantity higher than total quantity"})
                }
                inventory.Aminus -= req.body.quantity
            }
            else if(req.body.type === 'B-'){
                if(req.body.quantity > inventory.Bminus){
                    return res.status(401).send({success:false,message:"Requested quantity higher than total quantity"})
                }
                inventory.Bminus -= req.body.quantity
            }
            else if(req.body.type === 'B+'){
                if(req.body.quantity > inventory.Bplus){
                    return res.status(401).send({success:false,message:"Requested quantity higher than total quantity"})
                }
                inventory.Bplus -= req.body.quantity
            }
            else if(req.body.type === 'AB-'){
                if(req.body.quantity > inventory.ABminus){
                    return res.status(401).send({success:false,message:"Requested quantity higher than total quantity"})
                }
                inventory.ABminus -= req.body.quantity
            }
            else if(req.body.type === 'A+'){
                if(req.body.quantity > inventory.ABplus){
                    return res.status(401).send({success:false,message:"Requested quantity higher than total quantity"})
                }
                inventory.ABplus -= req.body.quantity
            }
            else if(req.body.type === 'O-'){
                if(req.body.quantity > inventory.Ominus){
                    return res.status(401).send({success:false,message:"Requested quantity higher than total quantity"})
                }
                inventory.Ominus -= req.body.quantity
            }
            else if(req.body.type === 'O+'){
                if(req.body.quantity > inventory.Oplus){
                    return res.status(401).send({success:false,message:"Requested quantity higher than total quantity"})
                }
                inventory.Oplus -= req.body.quantity
            }
            await inventory.save()
        }
        const bloodbankdata = await bloodBankData.create({
            bloodBank:req.body.bloodBank,
            name:req.body.name,
            type:'receiver',
            quantity: req.body.quantity,
            bloodType:req.body.bloodType,
            contact:req.body.contact
        })
        res.status(201).send({success:"true",message:"Successfull"})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getBloodBankData = async(req:Request,res:Response) =>{
    try{
        const data = await bloodBankData.find({bloodBank:req.params.id})
        res.status(201).send(data)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}