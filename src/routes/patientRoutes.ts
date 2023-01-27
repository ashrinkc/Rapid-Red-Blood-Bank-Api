import { Router } from "express";
import { getAllPatient, patientLogin, patientRegister } from "../controllers/patientController";

const patientRoute = Router()

patientRoute.post('/registerPatient',patientRegister)
patientRoute.post('/loginPatient',patientLogin)
patientRoute.get('/getAllPatient',getAllPatient)
export default patientRoute