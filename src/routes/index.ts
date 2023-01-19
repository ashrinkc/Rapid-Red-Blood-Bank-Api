import { Application, Request, Response } from "express";
import donorRoute from "./donorRoutes";
import organizationRoute from "./organizationRoutes";
import requestRoute from "./requestRoutes"

const routesSetup = (app:Application) =>{
    app.get('/',(req:Request,res:Response)=>res.send("Welcome to Rapid Red Blood Bank"))
    app.use('/api/donor',donorRoute)
    app.use('/api/organization',organizationRoute)
    app.use('/api/request',requestRoute)
}

export default routesSetup