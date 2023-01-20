import { Router } from "express";
import { patientLogin, patientRegister } from "../controllers/patientController";

const patientRoute = Router()

patientRoute.post('/registerPatient',patientRegister)
patientRoute.post('/loginPatient',patientLogin)

export default patientRoute