import { Router } from "express";
import { deletePatient, getAllPatient, patientLogin, patientRegister, updatePatient } from "../controllers/patientController";

const patientRoute = Router()

patientRoute.post('/registerPatient',patientRegister)
patientRoute.post('/loginPatient',patientLogin)
patientRoute.get('/getAllPatient',getAllPatient)
patientRoute.delete('/:id',deletePatient)
patientRoute.put('/:id',updatePatient)
export default patientRoute