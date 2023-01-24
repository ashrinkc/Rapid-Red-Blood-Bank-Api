import { Application, Request, Response } from "express";
import conversationRoute from "./conversationRoute";
import donorRoute from "./donorRoutes";
import messageRoute from "./messageRoute";
import organizationRoute from "./organizationRoutes";
import patientRoute from "./patientRoutes";
import requestRoute from "./requestRoutes"

const routesSetup = (app:Application) =>{
    app.get('/',(req:Request,res:Response)=>res.send("Welcome to Rapid Red Blood Bank"))
    app.use('/api/donor',donorRoute)
    app.use('/api/organization',organizationRoute)
    app.use('/api/patient',patientRoute)
    app.use('/api/request',requestRoute)
    app.use('/api/conversations',conversationRoute)
    app.use('/api/message',messageRoute)
}

export default routesSetup