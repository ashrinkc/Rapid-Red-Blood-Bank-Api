import { Application, Request, Response } from "express";
import adminRoute from "./adminRoute";
import conversationRoute from "./conversationRoute";
import donationnRoute from "./donationRoute";
import donorRoute from "./donorRoutes";
import eventRoute from "./eventRoute";
import feedbackRoute from "./feedbackRoute";
import inventoryRoute from "./inventoryRoute";
import messageRoute from "./messageRoute";
import organizationRoute from "./organizationRoutes";
import patientRoute from "./patientRoutes";
import requestRoute from "./requestRoutes"

const routesSetup = (app:Application) =>{
    app.get('/',(req:Request,res:Response)=>res.send("Welcome to Rapid Red Blood Bank"))
    app.use('/api/donor',donorRoute)
    app.use('/api/organization',organizationRoute)
    app.use('/api/patient',patientRoute)
    app.use('/api/admin',adminRoute)
    app.use('/api/request',requestRoute)
    app.use('/api/conversations',conversationRoute)
    app.use('/api/message',messageRoute)
    app.use('/api/events',eventRoute)
    app.use('/api/feedback',feedbackRoute)
    app.use('/api/donation',donationnRoute)
    app.use('/api/inventory',inventoryRoute)
}

export default routesSetup