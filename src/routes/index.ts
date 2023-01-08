import { Application, Request, Response } from "express";

const routesSetup = (app:Application) =>{
    app.get('/',(req:Request,res:Response)=>res.send("Welcome"))
}

export default routesSetup