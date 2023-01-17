import { Application, Request, Response } from "express";
import donorRoute from "./donorRoutes";

const routesSetup = (app:Application) =>{
    app.get('/',(req:Request,res:Response)=>res.send("Welcome to Rapid Red Blood Bank"))
    app.use('/api/donor',donorRoute)
}

export default routesSetup