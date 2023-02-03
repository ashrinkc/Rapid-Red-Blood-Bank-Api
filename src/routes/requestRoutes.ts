import { Router } from "express";
import { bloodDonationRequests, patientBloodRequest, getDonationRequests, getPatientBloodRequestsDonor, getPatientsBloodRequestsBloodBank } from "../controllers/requestController";

const requestRoute = Router()

requestRoute.post('/addRequest/:id',bloodDonationRequests)
requestRoute.get('/getRequest/:id',getDonationRequests)
requestRoute.post('/patientRequest/:id',patientBloodRequest)
requestRoute.get('/patientRequestDonor/:id',getPatientBloodRequestsDonor)
requestRoute.get('/patientRequestOrg/:id',getPatientsBloodRequestsBloodBank)
export default requestRoute