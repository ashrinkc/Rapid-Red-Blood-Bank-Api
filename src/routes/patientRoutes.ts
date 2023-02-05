import { Router } from "express";
import { deletePatient, getAllPatient, patientLogin, patientRegister } from "../controllers/patientController";

const patientRoute = Router()

patientRoute.post('/registerPatient',patientRegister)
patientRoute.post('/loginPatient',patientLogin)
patientRoute.get('/getAllPatient',getAllPatient)
patientRoute.delete('/:id',deletePatient)
export default patientRoute