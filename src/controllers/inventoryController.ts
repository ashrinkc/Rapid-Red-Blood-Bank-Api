import { Request, Response } from "express";
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
                inventory.Aplus += req.body.quantity
            }
            else if(req.body.type === 'AB-'){
                inventory.ABminus += req.body.quantity
            }
            else if(req.body.type === 'A+'){
                inventory.ABplus += req.body.quantity
            }
            else if(req.body.type === 'O-'){
                inventory.Ominus += req.body.quantity
            }
            else if(req.body.type === 'O+'){
                inventory.Oplus += req.body.quantity
            }
            await inventory.save()
            res.status(201).send({success:"true",message:"quantity added"})
        }
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}